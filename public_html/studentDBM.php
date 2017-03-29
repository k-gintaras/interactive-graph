<?php

/**
 * The MIT License (MIT) Copyright (c)
 * 
 * <2016><Gintaras Koncevicius>(@author Ubaby)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
$GLOBALS["myErrors"] = "\n";
$GLOBALS["dbhost"] = "mysql";
$GLOBALS["dbname"] = "samirexercises";
$GLOBALS["dbuser"] = "";
$GLOBALS["dbpass"] = "";

$GLOBALS["studentPass"] = getExcercisePw();
$GLOBALS['serverRoot'] = getServerRoot();

//splitters
$GLOBALS['imageSplitIndicator'] = "thisStringHasImage";
$GLOBALS['stringToSplitPasswordData'] = "stringToSplitPasswordData"; /* when submitting login, sometimes data is submitted aswell, it does not use sessions... */
$GLOBALS['stringToSplitQuery'] = "stringToSplitQuery";

//POSTS
$GLOBALS['loginPost'] = "studentLogin";
$GLOBALS['submitAgonistPost'] = "studentSubmitAgonist";
$GLOBALS['submitAntagonistPost'] = "studentSubmitAntagonist";
$GLOBALS['submitBindingAssay'] = "studentSubmitBindingAssay";
$GLOBALS['submitPharmacokinetics'] = "studentSubmitPharmacokinetics";

//responses
$GLOBALS['correctPasswordResponse'] = "correctPasswordResponseCorrect Password."; /* JS expects nonempty response so it can display stuff */
$GLOBALS['submittedResponse'] = "Successful Submission.";
$GLOBALS['alreadySubmittedResponse'] = "Already Submitted.";
$GLOBALS['badSubmissionResponse'] = "Bad Submission.";
$GLOBALS['wrongPasswordResponse'] = "Wrong Password."; /* could be empty to prevent spamming, sort it out later */

function getServerRoot() {
    return filter_input(INPUT_SERVER, 'DOCUMENT_ROOT', FILTER_SANITIZE_SPECIAL_CHARS);
}

function getPost($whichPost) {
    return filter_input(INPUT_POST, $whichPost, FILTER_SANITIZE_SPECIAL_CHARS);
}

function posted($whichPost) {
    $q = getPost($whichPost);
    return isset($q) && !empty($q);
}

function getCleanPost($whichPost) {
    $post = getPost($whichPost);
    return getCleanStringForSQL($post);
}

function getExcercisePw() {
    $con = connect();
    $qr = "SELECT value  FROM lecturerdata where type = '" . "exercisePassword" . "';";
    $result = query($con, $qr);
    $allData = oneRow($result);
    return $allData;
}

//
//MAIN
//
managePosts();

function managePosts() {
    if (posted($GLOBALS['loginPost'])) {
        $post = getCleanPost($GLOBALS['loginPost']);
        echo getLoginResponse($post);
    } elseif (posted($GLOBALS['submitAgonistPost'])) {
        $post = getPost($GLOBALS['submitAgonistPost']);
        echo submitAgonist($post);
    } elseif (posted($GLOBALS['submitAntagonistPost'])) {
        $post = getPost($GLOBALS['submitAntagonistPost']);
        echo submitAntagonist($post);
    } elseif (posted($GLOBALS['submitBindingAssay'])) {
        $post = getPost($GLOBALS['submitBindingAssay']);
        echo submitBindingAssay($post);
    } elseif (posted($GLOBALS['submitPharmacokinetics'])) {
        $post = getPost($GLOBALS['submitPharmacokinetics']);
        echo submitPharmacokinetics($post);
    }
}

function getLoginResponse($post) {
    if (isCorrectPassword($post)) {
        return $GLOBALS['correctPasswordResponse'];
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

//PHARMACOKINETICS SUBMISSION START
//submitPharmacokinetics
function submitPharmacokinetics($data) {
    if (isSubmissionWithImage($data)) {/* to only check clean string and not the image */
        $splitted = splitString($data, $GLOBALS['imageSplitIndicator']);
        if (count($splitted) === 3) {
            return submitPharmacokineticsStepOne($splitted);
        } else {
            return $GLOBALS['badSubmissionResponse'];
        }
    } else {
        return $GLOBALS['badSubmissionResponse'];
    }
}

function submitPharmacokineticsStepOne($arrayWithImages) {
    $userQueryData = getCleanStringForSQL($arrayWithImages[0]); /* clean user submission for database */
    $image1 = $arrayWithImages[1]; /* no need to clean image string, because only its generated directory is saved */
    $image2 = $arrayWithImages[2]; /* no need to clean image string, because only its generated directory is saved */

    $passwordData = splitString($userQueryData, $GLOBALS['stringToSplitPasswordData']);
    $studentSubmittedPassword = $passwordData[0];
    $queryData = splitString($passwordData[1], $GLOBALS['stringToSplitQuery']);
    $studentName = $queryData[0];
    $exerciseType = $queryData[1];
    $excerciseData = $queryData[2];

    if (isCorrectPassword($studentSubmittedPassword)) {
        return getUniquePharmacokineticsSubmission($studentName, $exerciseType, $excerciseData, $image1, $image2);
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

function getUniquePharmacokineticsSubmission($studentName, $exerciseType, $excerciseData, $image1, $image2) {
    if (isUniqueStudentSubmission($studentName, $exerciseType)) {
        return submitPharmacokineticsData($studentName, $exerciseType, $excerciseData, $image1, $image2);
    } else {
        return $GLOBALS['alreadySubmittedResponse'];
    }
}

function submitPharmacokineticsData($studentName, $exerciseType, $excerciseData, $image1, $image2) {
    $folder = $exerciseType . "/";
    $dir1 = $folder . $studentName . $exerciseType . "1.png";
    $dir2 = $folder . $studentName . $exerciseType . "2.png";
    
    $dirAll = $dir1 . $GLOBALS['imageSplitIndicator'] . $dir2 . $GLOBALS['imageSplitIndicator'];
    createImageFile($image1, $dir1);
    createImageFile($image2, $dir2);
    $qr = "INSERT INTO students (name, exercise, data, image) VALUES (" . quoted($studentName) . "," . quoted($exerciseType) . "," . quoted($excerciseData) . "," . quoted($dirAll) . ");";
    $con = connect();
    query($con, $qr);
    return $GLOBALS['submittedResponse'];
}

//PHARMACOKINETICS SUBMISSION END

//BINDING ASSAY SUBMISSION START
function submitBindingAssay($data) {
    if (isSubmissionWithImage($data)) {/* to only check clean string and not the image */
        $splitted = splitString($data, $GLOBALS['imageSplitIndicator']);
        if (count($splitted) === 6) {
            return submitBindingAssayStepOne($splitted);
        } else {
            return $GLOBALS['badSubmissionResponse'];
        }
    } else {
        return $GLOBALS['badSubmissionResponse'];
    }
}

function submitBindingAssayStepOne($arrayWithImages) {
    $userQueryData = getCleanStringForSQL($arrayWithImages[0]); /* clean user submission for database */
    $image1 = $arrayWithImages[1]; /* no need to clean image string, because only its generated directory is saved */
    $image2 = $arrayWithImages[2]; /* no need to clean image string, because only its generated directory is saved */
    $image3 = $arrayWithImages[3]; /* no need to clean image string, because only its generated directory is saved */
    $image4 = $arrayWithImages[4]; /* no need to clean image string, because only its generated directory is saved */
    $image5 = $arrayWithImages[5]; /* no need to clean image string, because only its generated directory is saved */

    $passwordData = splitString($userQueryData, $GLOBALS['stringToSplitPasswordData']);
    $studentSubmittedPassword = $passwordData[0];
    $queryData = splitString($passwordData[1], $GLOBALS['stringToSplitQuery']);
    $studentName = $queryData[0];
    $exerciseType = $queryData[1];
    $excerciseData = $queryData[2];

    if (isCorrectPassword($studentSubmittedPassword)) {
        return getUniqueBindingAssaySubmission($studentName, $exerciseType, $excerciseData, $image1, $image2, $image3, $image4, $image5);
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

function getUniqueBindingAssaySubmission($studentName, $exerciseType, $excerciseData, $image1, $image2, $image3, $image4, $image5) {
    if (isUniqueStudentSubmission($studentName, $exerciseType)) {
        return submitBindingAssayData($studentName, $exerciseType, $excerciseData, $image1, $image2, $image3, $image4, $image5);
    } else {
        return $GLOBALS['alreadySubmittedResponse'];
    }
}

function submitBindingAssayData($studentName, $exerciseType, $excerciseData, $image1, $image2, $image3, $image4, $image5) {
    $folder = $exerciseType . "/";
    $dir1 = $folder . $studentName . $exerciseType . "1.png";
    $dir2 = $folder . $studentName . $exerciseType . "2.png";
    $dir3 = $folder . $studentName . $exerciseType . "3.png";
    $dir4 = $folder . $studentName . $exerciseType . "4.png";
    $dir5 = $folder . $studentName . $exerciseType . "5.png";
    
    $dirAll = $dir1 . $GLOBALS['imageSplitIndicator'] . $dir2 . $GLOBALS['imageSplitIndicator'] . $dir3 . $GLOBALS['imageSplitIndicator'] . $dir4 . $GLOBALS['imageSplitIndicator'] . $dir5;
    createImageFile($image1, $dir1);
    createImageFile($image2, $dir2);
    createImageFile($image3, $dir3);
    createImageFile($image4, $dir4);
    createImageFile($image5, $dir5);
    $qr = "INSERT INTO students (name, exercise, data, image) VALUES (" . quoted($studentName) . "," . quoted($exerciseType) . "," . quoted($excerciseData) . "," . quoted($dirAll) . ");";
    $con = connect();
    query($con, $qr);
    return $GLOBALS['submittedResponse'];
}

//BINDING ASSAY SUBMISSION END
//ANTAGONIST SUBMISSION START
function submitAntagonist($data) {
    if (isSubmissionWithImage($data)) {/* to only check clean string and not the image */
        $splitted = splitString($data, $GLOBALS['imageSplitIndicator']);
        if (count($splitted) === 3) {
            return submitAntagonistStepOne($splitted);
        } else {
            return $GLOBALS['badSubmissionResponse'];
        }
    } else {
        return $GLOBALS['badSubmissionResponse'];
    }
}

function submitAntagonistStepOne($arrayWithImages) {
    $userQueryData = getCleanStringForSQL($arrayWithImages[0]); /* clean user submission for database */
    $image1 = $arrayWithImages[1]; /* no need to clean image string, because only its generated directory is saved */
    $image2 = $arrayWithImages[2]; /* no need to clean image string, because only its generated directory is saved */

    $passwordData = splitString($userQueryData, $GLOBALS['stringToSplitPasswordData']);
    $studentSubmittedPassword = $passwordData[0];
    $queryData = splitString($passwordData[1], $GLOBALS['stringToSplitQuery']);
    $studentName = $queryData[0];
    $exerciseType = $queryData[1];
    $excerciseData = $queryData[2];

    if (isCorrectPassword($studentSubmittedPassword)) {
        return getUniqueAntagonistSubmission($studentName, $exerciseType, $excerciseData, $image1, $image2);
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

function getUniqueAntagonistSubmission($studentName, $exerciseType, $excerciseData, $image1, $image2) {
    if (isUniqueStudentSubmission($studentName, $exerciseType)) {
        return submitAntagonistData($studentName, $exerciseType, $excerciseData, $image1, $image2);
    } else {
        return $GLOBALS['alreadySubmittedResponse'];
    }
}

function submitAntagonistData($studentName, $exerciseType, $excerciseData, $image1, $image2) {
    $folder = $exerciseType . "/";
    $dir1 = $folder . $studentName . $exerciseType . "1.png";
    $dir2 = $folder . $studentName . $exerciseType . "2.png";
    $dir3 = $dir1 . $GLOBALS['imageSplitIndicator'] . $dir2;
    createImageFile($image1, $dir1);
    createImageFile($image2, $dir2);
    $qr = "INSERT INTO students (name, exercise, data, image) VALUES (" . quoted($studentName) . "," . quoted($exerciseType) . "," . quoted($excerciseData) . "," . quoted($dir3) . ");";
    $con = connect();
    query($con, $qr);
    return $GLOBALS['submittedResponse'];
}

//ANTAGONIST SUBMISSION END
//AGONIST SUBMISSION START
function submitAgonist($data) {
    if (isSubmissionWithImage($data)) {/* to only check clean string and not the image */
        $splitted = splitString($data, $GLOBALS['imageSplitIndicator']);
        $userQueryData = getCleanStringForSQL($splitted[0]); /* clean user submission for database */
        $image = $splitted[1]; /* no need to clean image string, because only its generated directory is saved */
        $passwordData = splitString($userQueryData, $GLOBALS['stringToSplitPasswordData']);
        $studentSubmittedPassword = $passwordData[0];
        $queryData = splitString($passwordData[1], $GLOBALS['stringToSplitQuery']);
        $studentName = $queryData[0];
        $exerciseType = $queryData[1];
        $studentTextData = $queryData[2];

        if (isCorrectPassword($studentSubmittedPassword)) {
            return getUniqueAgonistSubmission($studentName, $exerciseType, $studentTextData, $image);
        } else {
            return $GLOBALS['wrongPasswordResponse'];
        }
    } else {
        return $GLOBALS['badSubmissionResponse'];
    }
}

function getUniqueAgonistSubmission($studentName, $exerciseType, $studentTextData, $image) {
    if (isUniqueStudentSubmission($studentName, $exerciseType)) {
        return submitAgonistData($studentName, $exerciseType, $studentTextData, $image);
    } else {
        return $GLOBALS['alreadySubmittedResponse'];
    }
}

function submitAgonistData($studentName, $exerciseType, $excerciseData, $image) {
    $folder = $exerciseType . "/";
    $dir = $folder . $studentName . $exerciseType . ".png";
    createImageFile($image, $dir);
    $qr = "INSERT INTO students (name, exercise, data, image) VALUES (" . quoted($studentName) . "," . quoted($exerciseType) . "," . quoted($excerciseData) . "," . quoted($dir) . ");";
    $con = connect();
    query($con, $qr);
    return $GLOBALS['submittedResponse'];
}

//AGONIST SUBMISSION END

function isSubmissionWithImage($str) {
    $strSplitted = splitString($str, $GLOBALS['imageSplitIndicator']);
    return count($strSplitted) > 1;
}

function createImageFile($img, $title) {
    $img1 = str_replace(' ', '+', $img);
    $img2 = substr($img1, strpos($img1, ",") + 1);
    $img3 = base64_decode($img2);
    $filePath = $GLOBALS['serverRoot'] . '/DrSamirExercises/public_html/studentImages/' . $title;
    $file = fopen($filePath, 'w');
    fwrite($file, $img3);
    fclose($file);
}

function isCorrectPassword($submittedPassword) {
    $pw = $GLOBALS["studentPass"];
    if ($pw === $submittedPassword) {
        return true;
    }
    return false;
}

function getCleanStringForSQL($str) {
    $str1 = getNoHTML($str); //no point storing htmltags in database
    $str2=getCleanBackSlashes($str1,"/");//replace backslashes with slashes to prevent escape tricks
    $str3=getNoQuotes($str2,"`");//replace quotes to prevent quote tricks
    return $str3;
}

function getNoWhitespace($str,$replace){
    preg_replace("/\s+/",$replace, $str);
}

function getNoQuotes($str,$replace){
      return preg_replace("/[\'\"]/",$replace, $str);
}

function getAlphanumericOnly($str){
    return  preg_replace("/[^0-9a-zA-Z \.]/", "", $str);//allow dots for numbers
}

function getNumericOnly($str){
    return  preg_replace("/[^0-9\.]/", "", $str);//allow dots
}

function getCleanBackSlashes($str,$replace){
   return preg_replace("/[\\\]/",$replace, $str);
}

function isJSON($string) {
    //has data and is not empty json
    $array = json_decode($string, true);
    return !empty($string) && is_string($string) && is_array($array) && !empty($array) && json_last_error() == 0 && $array !== null;
}

function getNoHTML($str) {
    return strip_tags(html_entity_decode($str));
}

function studentExists($student, $exercise) {
    $con = connect();
    $qr = "SELECT * FROM students WHERE name = " . quoted($student) . " AND exercise = " . quoted($exercise);
    $result = query($con, $qr);
    $arr = mysqli_fetch_array($result, MYSQL_ASSOC);
    if (count($arr) > 0) {
        return true;
    } else {
        return false;
    }
}

function isUniqueStudentSubmission($student, $exercise) {
    return !studentExists($student, $exercise);
}

function oneRow($res) {
    $arr = mysqli_fetch_array($res, MYSQL_ASSOC);
    if (count($arr) > 0) {
        return join($arr, "columns");
    }
}

function multiRowSingleColumResult($result, $column) {
    $rows = array(); // make a new array to hold all your data
    $index = 0;
    while ($row = mysqli_fetch_array($result, MYSQL_ASSOC)) {
        $rows[$index] = $row[$column];
        $index++;
    }
    if (count($rows) > 0) {
        return join($rows, "rows");
    }
}

function splitString($arr, $str) {
    return explode($str, $arr);
}

function qrToStr($res) {
    $all = "";
    if ($res) {
        while ($row = mysqli_fetch_assoc($res)) {
            $all.= rowToStr($row) . ";";
        }
    }
    return "" . substr($all, 0, strlen($all) - 1);
}

function rowToStr($row) {
    $all = "";
    foreach ($row as $val) {
        $all.=$val.=";";
    }
    return "" . substr($all, 0, strlen($all) - 1);
}

function cleanSpecials($strIn) {
    $str = legalizeString($strIn);
    $bad = "";
    if (!quotesOk($str)) {
        $bad = array("\&", "\\", "'", "\"", "$", "!", "--", ">", "<");
    } else {
        $bad = array("\&", "\\", "$", "!", "--", ">", "<");
    }
    $arrlength = count($bad);
    for ($x = 0; $x < $arrlength; $x++) {
        $str = str_replace($bad[$x], '-', $str);
    }
    if ($strIn !== $str) {
        setError("error@cleanSpecials($strIn)" . "Not allowed: " . "\\" . "/" . "'" . "\"" . "$" . "!" . "--" . ">" . "<" . " Cleaned: " . $str);
    }
    return $str;
}

function quoted($str) {
    return "'" . $str . "'";
}

function quotesOk($str) {
    $count1 = substr_count($str, "'");
    $count2 = substr_count($str, '"');
    if (isEven($count1) && isEven($count2)) {
        return true;
    }
    setError("error@quotesOk($str): Whoa, no quotes please");
    return false;
}

function isEven($num) {
    if ($num % 2 === 0) {
        return true;
    }return false;
}

function legalizeString($specialString) {
    if (is_string($specialString)) {
        if (strlen($specialString) < 10000000 && strlen($specialString) > 1) {
            return $specialString;
        } else {
            setError("error@legalizeString($specialString): String is too long >10000000 or too small <1");
        }
    } else {
        setError("error@legalizeString($specialString): String is not a string ^^");
    }
}

function isNotEmpty($string) {
    if ($string == "") {
        return false;
    } else {
        return true;
    }
}

function connect() {
    $con = new mysqli($GLOBALS["dbhost"], $GLOBALS["dbuser"], $GLOBALS["dbpass"], $GLOBALS["dbname"]);
    if ($con->connect_error) {
        setError("error-at connect(hst,usr,pw,db): Connection failed:\n" . $con->connect_error);
    }
    return $con;
}

function disconnect($con) {
    $con->close();
}

function query($con, $qr) {
    $result = $con->query($qr);
    disconnect($con);
    return $result;
}

function setError($error) {
    $GLOBALS["myErrors"].=$error . ".\n";
}

function displayErrors() {
    if (strlen($GLOBALS["myErrors"]) > 10) {
        echo "<textarea style='width:500px;height:500px;'>" . $GLOBALS["myErrors"] . "</textarea>";
    }
}

function getErrors() {
    if (strlen($GLOBALS["myErrors"]) > 10) {
        return "<textarea style='width:500px;height:500px;'>" . $GLOBALS["myErrors"] . "</textarea>";
    }
}

?>