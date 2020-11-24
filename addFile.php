<?php
//$sourcePath1 = $_FILES['fileUploaded']['name'];
//echo "you reached me";
//$username = $_GET['Username'];
//$password = $_GET['pass'];

//echo $username.$password;
//echo "data passed successfully";

//$pp = "http://slikke.net/Yousif/images";
$pp = "images";

$sourcePath1 = $_FILES['myfile']['name'];
$sourcePathName = explode(".", $sourcePath1);
echo realpath($_FILES['myfile']['tmp_name']);
if (is_uploaded_file($_FILES['myfile']['tmp_name']) && $_FILES['myfile']['error']==0) {
	//echo $_FILES['fileUploaded']['name'];
    $path = $pp.'/'.$_FILES['myfile']['name'];
    if (!file_exists($path)) {
      if (move_uploaded_file($_FILES['myfile']['tmp_name'], $path)) {
        echo "The file was uploaded successfully.";
        echo $_FILES['myfile']['tmp_name'];
        }
    }
    else{
    	echo "path already exists";
    }
}
else{
	echo $_FILES['myfile']['error'];
}
?>