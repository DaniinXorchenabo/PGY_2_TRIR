<?php
$file = fopen("Программисты.txt", "r");
$ans["num"] = 0;
while (!feof($file)) {
    $json = json_decode(fgets($file));
    if (strpos($json->{$_POST["field"]}, $_POST["text"])) {
        $ans["mass"][$ans["num"]]["sur"] = $json->{"sur"};
        $ans["mass"][$ans["num"]]["name"] = $json->{"name"};
        $ans["mass"][$ans["num"]]["sec"] = $json->{"sec"};
        $ans["mass"][$ans["num"]]["sex"] = $json->{"sex"};
        $ans["mass"][$ans["num"]]["age"] = $json->{"age"};
        $ans["mass"][$ans["num"]]["state"] = "Программист";
        $ans["num"]++;
    }
}
fclose($file);
$file = fopen("Тестировщики.txt", "r");
while (!feof($file)) {
    $json = json_decode(fgets($file));
    if (strpos($json->{$_POST["field"]}, $_POST["text"])) {
        $ans["mass"][$ans["num"]]["sur"] = $json->{"sur"};
        $ans["mass"][$ans["num"]]["name"] = $json->{"name"};
        $ans["mass"][$ans["num"]]["sec"] = $json->{"sec"};
        $ans["mass"][$ans["num"]]["sex"] = $json->{"sex"};
        $ans["mass"][$ans["num"]]["age"] = $json->{"age"};
        $ans["mass"][$ans["num"]]["state"] = "Тестировщик";
        $ans["num"]++;
    }
}
fclose($file);
$file = fopen("Стажеры.txt", "r");
while (!feof($file)) {
    $json = json_decode(fgets($file));
    if (strpos($json->{$_POST["field"]}, $_POST["text"]) ) {
        $ans["mass"][$ans["num"]]["sur"] = $json->{"sur"};
        $ans["mass"][$ans["num"]]["name"] = $json->{"name"};
        $ans["mass"][$ans["num"]]["sec"] = $json->{"sec"};
        $ans["mass"][$ans["num"]]["sex"] = $json->{"sex"};
        $ans["mass"][$ans["num"]]["age"] = $json->{"age"};
        $ans["mass"][$ans["num"]]["state"] = "Стажер";
        $ans["num"]++;
    }
}
echo json_encode($ans);
