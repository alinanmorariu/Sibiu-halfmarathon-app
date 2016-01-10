<?php 

//Get one item in the list, by id
function getItemFromList($tableName, $tableColumn, $id) {
     $sql = "select * FROM $tableName WHERE $tableColumn = '$id'";
     try {
            $db = getConnection();
            $stmt = $db->query($sql);  
            $item = $stmt->fetch(PDO::FETCH_OBJ);
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

//get one runner by id
function getRunner($id) {
    echo getItemFromList ('ALERGATORI', 'alergatorID', $id);
}

//get one supporter by id
function getSupporter($id) {
    echo getItemFromList ('SUSTINATORI', 'sustinatorID', $id);
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

//add a new runner to the DB
function addRunner() {
    global $app;
    $request = $app->request();
    $runner = json_decode($request->getBody());
    $sql = "INSERT INTO alergatori (prenume, nume, categorie, datanasterii, companie, localitate, telefon, email, cursa, record, proiectAles, marimeTricou, taxa, tipPlata, confirmat, platit, ordine_stafeta) VALUES (:prenume, :nume, :categorie, :datanasterii, :companie, :localitate, :telefon, :email, :cursa, :record, :proiectAles, :marimeTricou, :taxa, :tipPlata, :confirmat, :platit, :ordine_stafeta)";
    try {
        $db = getConnection();
        $stmt = $db->prepare($sql);
        $stmt->bindParam("prenume", $runner->prenume);
        $stmt->bindParam("nume", $runner->nume);
        $stmt->bindParam("categorie", $runner->categorie);
        $stmt->bindParam("datanasterii", $runner->datanasterii);
        $stmt->bindParam("companie", $runner->companie);
        $stmt->bindParam("localitate", $runner->localitate);
        $stmt->bindParam("telefon", $runner->telefon);
        $stmt->bindParam("email", $runner->email);
        $stmt->bindParam("cursa", $runner->cursa);
        $stmt->bindParam("record", $runner->record);
        $stmt->bindParam("proiectAles", $runner->proiectAles);
        $stmt->bindParam("marimeTricou", $runner->marimeTricou);
        $stmt->bindParam("taxa", $runner->taxa);
        $stmt->bindParam("tipPlata", $runner->tipPlata);
        $stmt->bindParam("confirmat", $runner->confirmat);
        $stmt->bindParam("platit", $runner->platit);
        $stmt->bindParam("ordine_stafeta", $runner->ordine_stafeta);
        $stmt->execute();
        $runner->alergatorID = $db->lastInsertId();
        $db = null;
        echo json_encode(utf8ize($runner));
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}

function addListOfRunners() {
    global $app;
    $request = $app->request();
    $list = json_decode($request->getBody());
    $sql = "INSERT INTO alergatori (prenume, nume, categorie, datanasterii, companie, localitate, telefon, email, cursa, record, proiectAles, marimeTricou, taxa, tipPlata, echipa, ordine_stafeta) VALUES (:prenume, :nume, :categorie, :datanasterii, :companie, :localitate, :telefon, :email, :cursa, :record, :proiectAles, :marimeTricou, :taxa, :tipPlata, :echipa, :ordine_stafeta)";
    
    try{
        $db = getConnection();
        $stmt = $db->prepare($sql);
        foreach($list as $key => $value){                      
            $stmt->bindParam("prenume", $value->prenume);
            $stmt->bindParam("nume", $value->nume);
            $stmt->bindParam("categorie", $value->categorie);
            $stmt->bindParam("datanasterii", $value->datanasterii);
            $stmt->bindParam("companie", $value->companie);
            $stmt->bindParam("localitate", $value->localitate);
            $stmt->bindParam("telefon", $value->telefon);
            $stmt->bindParam("email", $value->email);
            $stmt->bindParam("cursa", $value->cursa);
            $stmt->bindParam("record", $value->record);
            $stmt->bindParam("proiectAles", $value->proiectAles);
            $stmt->bindParam("marimeTricou", $value->marimeTricou);
            $stmt->bindParam("taxa", $value->taxa);
            $stmt->bindParam("tipPlata", $value->tipPlata);
            $stmt->bindParam("echipa", $value->echipa);
            $stmt->bindParam("ordine_stafeta", $value->ordine_stafeta);
            $stmt->execute();
            $value->alergatorID = $db->lastInsertId();
            json_encode(utf8ize($value));
        }
        $db = null;
    } catch(PDOException $e) {
        echo 'ERROR: ' . $e->getMessage();
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

//update runner

function updateRunner($id) {
   global $app;
   $req = $app->request();
   $runner = json_decode($req->getBody());
   $sql = "UPDATE alergatori SET prenume=:prenume, nume=:nume, categorie=:categorie, datanasterii=:datanasterii, echipa=:echipa, ordine_stafeta=:ordine_stafeta, companie=:companie, localitate=:localitate, telefon=:telefon, email=:email, cursa=:cursa, record=:record, proiectAles=:proiectAles, marimeTricou=:marimeTricou, confirmat=:confirmat, taxa=:taxa, platit=:platit, tipPlata=:tipPlata, documentJustificativ=:documentJustificativ, dataPlata=:dataPlata, Observatii=:Observatii, suma_propusa=:suma_propusa, text_fundraiser=:text_fundraiser, foto=:foto, diaspora=:diaspora WHERE alergatorID=:alergatorID";
   try {
     $db = getConnection();
     $stmt = $db->prepare($sql);
     $stmt->bindParam("prenume", $runner->prenume);
     $stmt->bindParam("nume", $runner->nume);
     $stmt->bindParam("categorie", $runner->categorie);
     $stmt->bindParam("datanasterii", $runner->datanasterii);
     $stmt->bindParam("echipa", $runner->echipa);
     $stmt->bindParam("ordine_stafeta", $runner->ordine_stafeta);
     $stmt->bindParam("companie", $runner->companie);
     $stmt->bindParam("localitate", $runner->localitate);
     $stmt->bindParam("telefon", $runner->telefon);
     $stmt->bindParam("email", $runner->email);
     $stmt->bindParam("cursa", $runner->cursa);
     $stmt->bindParam("record", $runner->record);
     $stmt->bindParam("proiectAles", $runner->proiectAles);
     $stmt->bindParam("marimeTricou", $runner->marimeTricou);
     $stmt->bindParam("confirmat", $runner->confirmat);
     $stmt->bindParam("taxa", $runner->taxa);
     $stmt->bindParam("platit", $runner->platit);
     $stmt->bindParam("tipPlata", $runner->tipPlata);
     $stmt->bindParam("documentJustificativ", $runner->documentJustificativ);
     $stmt->bindParam("dataPlata", $runner->dataPlata);
     $stmt->bindParam("Observatii", $runner->Observatii);
     $stmt->bindParam("suma_propusa", $runner->suma_propusa);
     $stmt->bindParam("text_fundraiser", $runner->text_fundraiser);
     $stmt->bindParam("foto", $runner->foto);
     $stmt->bindParam("diaspora", $runner->diaspora);
     $stmt->bindParam("alergatorID", $id);
     $stmt->execute();
     $db = null;
     echo json_encode(utf8ize($runner));
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

function deleteRunner($id) {
    echo deleteItem('alergatori', 'alergatorID', $id);
}
   
?>