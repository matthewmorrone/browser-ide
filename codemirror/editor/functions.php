<?php
function list_dir($dir, $depth) 
{
	if (is_dir($dir) && count(scandir($dir)) > 2) 
	{
		print "<ul>";
		if ($dh = opendir($dir)) 
		{
			while (($file = readdir($dh)) !== false) 
			{
				if ($file == "." || $file == ".." || substr($file, 0, 1) == "." || ($file == "index.php" && $depth == 0)) {continue;}	
				if (is_dir($dir."/".$file))
				{
					print "<input type='checkbox' class='rem' /><li><button class='list'><a href='".$dir."/".$file."'>".$file."</a></button>";
					list_dir($dir."/".$file, $depth+1);
					print "</li>";
				}
				else
				{
					print "<input type='checkbox' class='rem' /><li class='li'><a href='".$dir."/".$file."'>".$file."</a></li>"; 
				}
			}
		}
		print "</ul>";
	}
}
function copy_folder($src, $dst) 
{ 
    $dir = opendir($src); 
    @mkdir($dst); 
    while(false !== ($file = readdir($dir))) 
    { 
        if (($file != '.') && ($file != '..')) 
        { 
            if (is_dir($src.'/'.$file) ) 
            { 
                recurse_copy($src.'/'.$file, $dst.'/'.$file); 
            } 
            else 
            { 
                copy($src.'/'.$file, $dst.'/'.$file); 
            } 
        } 
    } 
    closedir($dir); 
} 
$dir = "directory";
if ($_POST["mode"] == 1)
{
 	print "<button class='list'>".$dir."</button>";
	list_dir($dir, 0);
}
if ($_POST["mode"] == 2)
{
	$href = $_POST["href"];
	echo file_get_contents($href);
}
if ($_POST["mode"] == 3)
{
	$name = $_POST["name"];
	$file = fopen($name, "w");
	$text = $_POST["text"];
	fwrite($file, $text);
	fclose($file);
	echo $name;
}
if ($_POST["mode"] == 4)
{
	$dir = $_POST["path"];
	if (is_dir($dir)) 
	{
		if ($dh = opendir($dir)) 
		{
			while (($file = readdir($dh)) !== false) 
			{
				if ($file == "." || $file == ".." || substr($file, 0, 1) == ".") {continue;}	
				$old = $dir.'/'.$file;
				$new = 'trash';
				copy($old, $new) or die("Unable to copy $old to $new.");
				unlink($dir."/".$file);
			}
		}
		copy_folder($dir, "trash");
		rmdir($dir);
	}
	else
	{
		$old = $dir.'/'.$file;
		$new = 'trash';
		copy($old, $new) or die("Unable to copy $old to $new.");
		unlink($dir);
	}
	echo $dir;
}
?>