<?php 

//Get one item in the list, by id
function getItemFromList($tableName, $tableColumn, $id) {
     $sql = "select * FROM $tableName WHERE $tableColumn = '$id'";
     try {
            $db = getConnection();
            $stmt = $db->query($sql);  
            $item = $stmt->fetch(PDO::FETCH_OBJ);
         //print_r($item);
            $db = null;
            echo json_encode(utf8ize($item));
          } catch(PDOException $e) {
            echo '{"error":{"text":'. $e->getMessage() .'}}'; 
          }
    }

//get one project by id
function getProject($id) {
    echo getItemFromList ('PROIECTE', 'proiectID', $id);
}

//add a new project to the DB
function addProject() {
    global $app;
    $request = $app->request();
    $project = json_decode($request->getBody());
    $sql = "INSERT INTO proiecte (proiect, organizatie, suma_propusa, url) VALUES (:proiect, :organizatie, :suma_propusa, :url)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("proiect", $project->proiect);
        $stmt->bindParam("organizatie", $project->organizatie);
        $stmt->bindParam("suma_propusa", $project->suma);
        $stmt->bindParam("url", $project->url);
        $stmt->execute();
        $project->proiectID = $db->lastInsertId();
        $db = null;
        echo json_encode(utf8ize($project));
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

//update project

function updateProject($id) {
   global $app;
   $req = $app->request();
   $project = json_decode($req->getBody());
    
   $sql = "UPDATE proiecte SET proiect=:proiect, organizatie=:organizatie, suma_propusa=:suma_propusa, url=:url WHERE proiectID=:proiectID";
   try {
     $db = getConnection();
     $stmt = $db->prepare($sql);
     $stmt->bindParam("proiect", $project->proiect);
     $stmt->bindParam("organizatie", $project->organizatie);
     $stmt->bindParam("suma_propusa", $project->suma_propusa);
     $stmt->bindParam("url", $project->url);
     $stmt->bindParam("proiectID", $id);
     $stmt->execute();
     $db = null;
     echo json_encode(utf8ize($project));
   } catch(PDOException $e) {
     echo json_encode($e->getMessage());
   }
}

function deleteItem($tableName, $itemID, $id) {
   $sql = "DELETE FROM $tableName WHERE $itemID=:$itemID";
   try {
     $db = getConnection();
     $stmt = $db->prepare($sql);
     $stmt->bindParam("$itemID", $id);
     $stmt->execute();
     $db = null;
  } catch(PDOException $e) {
     echo json_encode($e->getMessage());
  }
}

function deleteProject($id) {
    echo deleteItem('proiecte', 'proiectID', $id);
}
   
?>