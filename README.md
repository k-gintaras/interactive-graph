## To find out "why" scroll to the bottom where it is explained

## To test it either run it on server and view demo links in the index.html

or view screenshots.

Inline-style: 
![alt text](https://github.com/k-gintaras/interactive-graph/tree/master/public_html/screenshots/interractive test.JPG "Interactive Graph Example")


****

## To install you need:
 to take the folder of this soft (with or without git) and put it in the server
 to create database from given sql or modify (studentDBM and lecturerDBM to store and retrieve data in other way)
 
 current database connection settings in lecturerDBM.php and studentDBM.php:
$GLOBALS["myErrors"] = "\n";
$GLOBALS["dbhost"] = "localhost";
$GLOBALS["dbname"] = "organbathsimulation";
$GLOBALS["dbuser"] = "root";
$GLOBALS["dbpass"] = "";
 
## Lecturer's page is at 
public_html/lecturer.html

lecturers password, currently can only be changed by interacting with database directly, due to required system for password recovery if that was indirect:
111

current exercise password, can be changed in the lecturer's page:
111

## Student's page is at 
index.html

## How it works:
html page sends AJAX request to lecturerDBM or studentDBM, these then communicate with database

## How students submit:
As singular or group of students they can enter their IDs separated by space or comma and enter EXERCISE password given by the lecturer
lecturer can change EXERCISE password any time, so then students cannot submit anymore and therefore have a time constraint for lecturer to decide, whenever lecturer changes password
currently lecturer can only review answers and manually has to check for correct or wrong answers with the assistance of images from submitted graphs.

## The Why's:

## Why it is a mess:
First page was agonists, with the idea that there will be no more pages, then wild new requirements popped up and the need to separate concerns arose.
That lead to other pages having different designs and separate graph instance redesigned for reuse along with separate file for description of user inputs and outputs.
Requirements kept changing on the go with the quick prototypes on to which things had to be built on top to save time.
Very slow feedbacks for requirement analysis, mostly individual work through experimentation and determination to simply practice solving problems from scratch without using external help.

## Why no libraries:
Part of final year project, to learn solving problems from scratch and practice programming, also to reduce the need for referencing other's work.
ufunctions is small alternative to basic jQuery. its main functions are called like H.el.div(id,where); for example to create new div.
ugraph is custom interactive graph library written completely from scratch and can be reused for future exercises
helpfulFunctions is small set of functions to create elements, but not for every exercise as for reason (why it is a mess).
other functions are old versions of these and mostly used in the agonist, which was left as is, because of the "why it is a mess".

## Why no MVC:
Just graduated, after graduation first time heard about it was in job specification.

## Why no relational database:
This was prototyping based design starting from very vague requirements with no overall description of the whole system. Things got extremely oversimplified there and overcomplicated elsewhere.
