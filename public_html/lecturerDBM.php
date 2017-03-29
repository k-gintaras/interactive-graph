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

$GLOBALS["lecturerPass"] = getLecturersPw();
$GLOBALS["studentPass"] = getExcercisePw();

//splitters
$GLOBALS['imageSplitIndicator'] = "thisStringHasImage";
$GLOBALS['stringToSplitPasswordData'] = "stringToSplitPasswordData"; //when submitting login, sometimes data is submitted aswell, it does not use sessions...
$GLOBALS['stringToSplitQuery'] = "stringToSplitQuery";

//POSTS
$GLOBALS['lecturerLoginPost'] = "lecturerLogin";
$GLOBALS['lecturerChangeExercisePasswordPost'] = "lecturerChangeExercisePassword";
$GLOBALS['getStudentNamesPost'] = "getStudentNames";
$GLOBALS['viewStudentPost'] = "viewStudent";
$GLOBALS['viewAnswerPost'] = "viewAnswer";
$GLOBALS['removeStudentPost'] = "removeStudent";

//responses
$GLOBALS['studentsResponse'] = "studentsResponse"; //multiple
$GLOBALS['studentResponse'] = "studentResponse"; //single with data
$GLOBALS['answerResponse'] = "answerResponse"; //single with data
$GLOBALS['wrongPasswordResponse'] = "";
$GLOBALS['correctPasswordResponse'] = "correctPasswordResponse"; //JS expects nonempty response so it can display stuff
$GLOBALS['lecturerChangeExercisePasswordResponse'] = "changedPasswordResponse";
$GLOBALS['removedStudentResponse'] = "removedStudentResponse";

function getPost($str){
    return filter_input(INPUT_POST, $str, FILTER_SANITIZE_SPECIAL_CHARS);
}

function posted($str) {
    $q = getPost($str);
    return isset($q) && !empty($q);
}

//THIS HAS TO BE CHECKED BEFORE PUBLISHING, Security concerns
//is is used to get values and submit to database, including remove students
//string is cleaned with function  getCleanStringForSQL($str) after you pass the POST
function getCleanPost($str) {
    $post = getPost($str);
    return getCleanStringForSQL($post);
}

function getLecturersPw() {
    $con = connect();
    $qr = "SELECT value  FROM lecturerdata where type = '" . "lecturerPassword" . "';";
    $result = query($con, $qr);
    $allData = oneRow($result);
    return $allData;
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
    if (posted($GLOBALS['lecturerLoginPost'])) {
        $post = getCleanPost($GLOBALS['lecturerLoginPost']);
        echo getLoginResponse($post);
    } elseif (posted($GLOBALS['getStudentNamesPost'])) {
        $post = getCleanPost($GLOBALS['getStudentNamesPost']);
        echo getStudentNames($post);
    } elseif (posted($GLOBALS['viewStudentPost'])) {
        $post = getCleanPost($GLOBALS['viewStudentPost']);
        echo getStudent($post);
    } elseif (posted($GLOBALS['viewAnswerPost'])) {
        $post = getCleanPost($GLOBALS['viewAnswerPost']);
        echo getAnswer($post);
    } elseif (posted($GLOBALS['removeStudentPost'])) {
        $post = getCleanPost($GLOBALS['removeStudentPost']);
        echo getRemovedStudentResponse($post);
    } elseif (posted($GLOBALS['lecturerChangeExercisePasswordPost'])) {
        $post = getCleanPost($GLOBALS['lecturerChangeExercisePasswordPost']);
        echo getChangedExcercisePasswordResponse($post);
    }
}

function getRemovedStudentResponse($post) {
    $passwordSplitter = $GLOBALS['stringToSplitPasswordData'];
    $data = splitString($post, $passwordSplitter);
    $password = $data[0];
    $student=$data[1];
    $exercise=$data[2];
    
    if (isCorrectPassword($password)) {
        return removeStudent($student,$exercise);
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

function getChangedExcercisePasswordResponse($post) {
    $passwordSplitter = $GLOBALS['stringToSplitPasswordData'];
    $data = splitString($post, $passwordSplitter);
    $submittedPassword = $data[0];
    if (isCorrectPassword($submittedPassword)) {
        return changePassword($data[1]);
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

function getLoginResponse($post) {
    if (isCorrectPassword($post)) {
        return $GLOBALS['correctPasswordResponse'];
    } else {
        return $GLOBALS['wrongPasswordResponse'];
    }
}

function getStudent($post) {
    $passwordSplitter = $GLOBALS['stringToSplitPasswordData'];
    $querySplitter = $GLOBALS['stringToSplitQuery'];
    $getStudent_RESPONSE = $GLOBALS['studentResponse'];
    $data = splitString($post, $passwordSplitter);
    $submittedPassword = $data[0];
    $submitData = splitString($data[1], $querySplitter);
    $exercise = $submitData[0];
    $name = $submitData[1];
    $pw = $GLOBALS["lecturerPass"];
    $reply = $GLOBALS['wrongPasswordResponse'];
    if ($pw === $submittedPassword) {
        $reply = $getStudent_RESPONSE . selectStudent($name, $exercise);
    }
    return $reply;
}

function getAnswer($post) {
    $passwordSplitter = $GLOBALS['stringToSplitPasswordData'];
    $querySplitter = $GLOBALS['stringToSplitQuery'];
    $getAnswer_RESPONSE = $GLOBALS['answerResponse'];
    $data = splitString($post, $passwordSplitter);
    $submittedPassword = $data[0];
    $submitData = splitString($data[1], $querySplitter);
    $exercise = $submitData[0];
    $pw = $GLOBALS["lecturerPass"];
    $reply = $GLOBALS['wrongPasswordResponse'];
    if ($pw === $submittedPassword) {
        $reply = $getAnswer_RESPONSE . selectAnswer($exercise);
    }
    return $reply;
}

function getStudentNames($post) {
    $passwordSplitter = $GLOBALS['stringToSplitPasswordData'];
    $getStudents_RESPONSE = $GLOBALS['studentsResponse'];
    $data = splitString($post, $passwordSplitter);
    $submittedPassword = $data[0];
    $exerciseType = $data[1];
    $reply = $GLOBALS['wrongPasswordResponse'];
    if (isCorrectPassword($submittedPassword)) {
        $reply = $getStudents_RESPONSE . selectStudentNameList($exerciseType);
    }
    return $reply;
}

function isCorrectPassword($submittedPassword) {
    $pw = $GLOBALS["lecturerPass"];
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

function removeStudent($student,$exercise) {
    $con = connect();
    $qr = "DELETE  FROM students where name = ".quoted($student)." AND exercise = ".quoted($exercise).";";
    query($con, $qr);
    $re = $GLOBALS['removedStudentResponse'];
    if ($re != "") {
        return $GLOBALS['removedStudentResponse'] . $student;
    }
    return $re;
}

function changePassword($new) {
    $con = connect();
    $qr = "UPDATE lecturerdata SET value = '" . $new . "' WHERE type = 'exercisePassword';";
    query($con, $qr);
    $re = $GLOBALS['lecturerChangeExercisePasswordResponse'];
    return $re;
}

function getStudentList() {
    $con = connect();
    $qr = "SELECT name FROM students;";
    $result = query($con, $qr);
    $allData = multiRowSingleColumResult($result, "name");
    return $allData;
}

function selectStudentNameList($exerciseType) {
    $con = connect();
    $qr = "SELECT name FROM students WHERE exercise = " . quoted($exerciseType);
    $result = query($con, $qr);
    $allData = multiRowSingleColumResult($result, "name");
    return $allData;
}

function selectStudent($student, $exercise) {
    $con = connect();
    $qr = "SELECT name, exercise, data, image FROM students WHERE name = " . quoted($student) . " AND exercise = " . quoted($exercise).";";
    $result = query($con, $qr);
    $allData = oneRow($result);
    return $allData;
}

function selectAnswer($exercise) {
    $con = connect();
    $qr = "SELECT answers FROM answers WHERE exercise = " . quoted($exercise) .";";
    $result = query($con, $qr);
    $allData = oneRow($result);
    return $allData;
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