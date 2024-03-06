<?php
require_once 'controller.php';
class Conversation extends Controller
{

    function selectReceivers($employee_id)
    {
        $this->setStatement("
        SELECT
        primary_eval.employee_id AS receiver_id,
        CASE 
        WHEN primary_eval.middle_name IS NOT NULL AND primary_eval.middle_name <> '' THEN
            CONCAT(primary_eval.first_name, ' ', SUBSTRING(primary_eval.middle_name, 1, 1), '. ', primary_eval.last_name)
        ELSE
            CONCAT(primary_eval.first_name, ' ', primary_eval.last_name)
        END AS receivers
        FROM hr_users
        LEFT JOIN hr_users AS primary_eval ON hr_users.primary_evaluator = primary_eval.employee_id
        WHERE hr_users.employee_id = :employee_id
        
        UNION ALL
        
        SELECT
        secondary_eval.employee_id AS receiver_id,
        CASE 
        WHEN secondary_eval.middle_name IS NOT NULL AND secondary_eval.middle_name <> '' THEN
            CONCAT(secondary_eval.first_name, ' ', SUBSTRING(secondary_eval.middle_name, 1, 1), '. ', secondary_eval.last_name)
        ELSE
            CONCAT(secondary_eval.first_name, ' ', secondary_eval.last_name)
        END AS receivers
        FROM hr_users
        LEFT JOIN hr_users AS secondary_eval ON hr_users.secondary_evaluator = secondary_eval.employee_id
        WHERE hr_users.employee_id = :employee_id
        
        UNION ALL
        
        SELECT
        tertiary_eval.employee_id AS receiver_id,
        CASE 
        WHEN tertiary_eval.middle_name IS NOT NULL AND tertiary_eval.middle_name <> '' THEN
            CONCAT(tertiary_eval.first_name, ' ', SUBSTRING(tertiary_eval.middle_name, 1, 1), '. ', tertiary_eval.last_name)
        ELSE
            CONCAT(tertiary_eval.first_name, ' ', tertiary_eval.last_name)
        END AS receivers
        FROM hr_users
        LEFT JOIN hr_users AS tertiary_eval ON hr_users.tertiary_evaluator = tertiary_eval.employee_id
        WHERE hr_users.employee_id = :employee_id
        
        UNION ALL
        
        SELECT
        hr_users.employee_id AS receiver_id,
        CASE 
        WHEN hr_users.middle_name IS NOT NULL AND hr_users.middle_name <> '' THEN
            CONCAT(hr_users.first_name, ' ', SUBSTRING(hr_users.middle_name, 1, 1), '. ', hr_users.last_name)
        ELSE
            CONCAT(hr_users.first_name, ' ', hr_users.last_name)
        END AS receivers
        FROM hr_users
        WHERE
        (hr_users.primary_evaluator = :employee_id OR hr_users.secondary_evaluator = :employee_id OR hr_users.tertiary_evaluator = :employee_id)
        ");
        $this->statement->execute([':employee_id' => $employee_id]);
        return $this->statement->fetchAll();
    }

    //New conversations
    function insertNewConversation($user_id, $receiver_id, $convo_type, $selected_quarter, $selected_coach, $convo_agenda, $convo_message, $see_admin, $rater_access)
    {
        $this->setStatement("INSERT INTO hr_convo_inbox (user_1, user_2, convo_type, evaluation_quarter, coaching_type, admin_access, rater_access, agenda, last_sent_message, last_sent_user_id, deleted, last_modified, creation_date) VALUES (:user_1, :user_2, :convo_type, :evaluation_quarter, :coaching_type, :admin_access, :rater_access, :agenda, :last_sent_message, :last_sent_user_id, :deleted, :last_modified, :creation_date)");
        $this->statement->execute([':user_1' => $user_id, ':user_2' => $receiver_id, ':convo_type' => $convo_type, ':evaluation_quarter' => $selected_quarter, ':coaching_type' => $selected_coach, 'agenda' => $convo_agenda, ':admin_access' => $see_admin, ':rater_access' => $rater_access, ':last_sent_message' => $convo_message, ':last_sent_user_id' => $user_id, ':deleted' => 0, ':last_modified' => date('Y-m-d H:i:s'), ':creation_date' => date('Y-m-d H:i:s')]);
        return $this->connection->lastInsertId();
    }
    // function insertParticipantConversation($inbox, $ID)
    // {
    //     $this->setStatement("INSERT INTO hr_convo_participants (inbox_id, employee_id) VALUES (:inbox_id, :employee_id)");
    //     return $this->statement->execute([':inbox_id' => $inbox, ':employee_id' => $ID]);
    // }
    function insertMessage($inbox, $user_id, $message_type, $convo_message, $reply_id)
    {
        $this->setStatement("INSERT INTO hr_convo_messages (inbox_id, employee_id, message_type, message, reply_id, creation_date) VALUES (:inbox_id, :employee_id, :message_type, :message, :reply, :creation_date)");
        return $this->statement->execute([':inbox_id' => $inbox, ':employee_id' => $user_id, 'message_type' => $message_type, ':message' => $convo_message, ':reply' => $reply_id, ':creation_date' => date('Y-m-d H:i:s')]);
    }


    //For Conversations
    function selectAllEmployeeConversations($convo_type)
    {
        $this->setStatement("SELECT
        CASE 
        WHEN converse_user_1.middle_name IS NOT NULL AND converse_user_1.middle_name <> '' THEN
            CONCAT(converse_user_1.first_name, ' ', SUBSTRING(converse_user_1.middle_name, 1, 1), '. ', converse_user_1.last_name)
        ELSE
            CONCAT(converse_user_1.first_name, ' ', converse_user_1.last_name)
        END AS converse_name_1,
        CASE 
        WHEN converse_user_2.middle_name IS NOT NULL AND converse_user_2.middle_name <> '' THEN
            CONCAT(converse_user_2.first_name, ' ', SUBSTRING(converse_user_2.middle_name, 1, 1), '. ', converse_user_2.last_name)
        ELSE
            CONCAT(converse_user_2.first_name, ' ', converse_user_2.last_name)
        END AS converse_name_2,
            hr_convo_inbox.* 
        FROM hr_convo_inbox
        INNER JOIN hr_users AS converse_user_1 ON converse_user_1.employee_id = hr_convo_inbox.user_1
        INNER JOIN hr_users AS converse_user_2 ON converse_user_2.employee_id = hr_convo_inbox.user_2
        WHERE convo_type = ?");
        $this->statement->execute([$convo_type]);
        return $this->statement->fetchAll();
    }

    function selectEmployeeConversations($user_id, $convo_type)
    {
        $this->setStatement("SELECT
        CASE 
        WHEN converse_user_1.middle_name IS NOT NULL AND converse_user_1.middle_name <> '' THEN
            CONCAT(converse_user_1.first_name, ' ', SUBSTRING(converse_user_1.middle_name, 1, 1), '. ', converse_user_1.last_name)
        ELSE
            CONCAT(converse_user_1.first_name, ' ', converse_user_1.last_name)
        END AS converse_name_1,
        CASE 
        WHEN converse_user_2.middle_name IS NOT NULL AND converse_user_2.middle_name <> '' THEN
            CONCAT(converse_user_2.first_name, ' ', SUBSTRING(converse_user_2.middle_name, 1, 1), '. ', converse_user_2.last_name)
        ELSE
            CONCAT(converse_user_2.first_name, ' ', converse_user_2.last_name)
        END AS converse_name_2,
        hr_convo_inbox.* 
        FROM hr_convo_inbox
        INNER JOIN hr_users AS converse_user_1 ON converse_user_1.employee_id = hr_convo_inbox.user_1
        INNER JOIN hr_users AS converse_user_2 ON converse_user_2.employee_id = hr_convo_inbox.user_2
        WHERE convo_type = :convo_type
        AND 
        (hr_convo_inbox.user_1 IN (SELECT employee_id FROM hr_users WHERE (hr_users.secondary_evaluator = :employee_id OR hr_users.tertiary_evaluator = :employee_id)) AND
        hr_convo_inbox.user_2 IN (SELECT employee_id FROM hr_users WHERE (hr_users.secondary_evaluator = :employee_id OR hr_users.tertiary_evaluator = :employee_id)))
        ");
        $this->statement->execute([":employee_id" => $user_id, ":convo_type" => $convo_type]);
        return $this->statement->fetchAll();
    }

    function selectConversations($user_id, $convo_type)
    {
        $this->setStatement("SELECT
        CASE
            WHEN :user_id = hr_convo_inbox.user_1 THEN hr_convo_inbox.user_2
            ELSE hr_convo_inbox.user_1
        END AS converse_id,
        
        CASE 
        WHEN converse_user.middle_name IS NOT NULL AND converse_user.middle_name <> '' THEN
            CONCAT(converse_user.first_name, ' ', SUBSTRING(converse_user.middle_name, 1, 1), '. ', converse_user.last_name)
        ELSE
            CONCAT(converse_user.first_name, ' ', converse_user.last_name)
        END AS converse_name,
        
        hr_convo_inbox.*
        FROM hr_convo_inbox
        INNER JOIN hr_users AS converse_user ON 
            (CASE WHEN :user_id = hr_convo_inbox.user_1 THEN hr_convo_inbox.user_2 ELSE hr_convo_inbox.user_1 END) = converse_user.employee_id
        WHERE (hr_convo_inbox.user_1 = :user_id OR hr_convo_inbox.user_2 = :user_id)
        AND hr_convo_inbox.convo_type = :convo_type");
        $this->statement->execute(['user_id' => $user_id, ':convo_type' => $convo_type]);
        return $this->statement->fetchAll();
    }

    function selectConvoSettings($employee_id, $convo_id)
    {
        // SELECT 
        // hr_users.employee_id AS converse_id,
        //      CASE 
        //          WHEN hr_users.middle_name IS NOT NULL AND hr_users.middle_name <> '' THEN
        //              CONCAT(hr_users.first_name, ' ', SUBSTRING(hr_users.middle_name, 1, 1), '. ', hr_users.last_name)
        //          ELSE
        //              CONCAT(hr_users.first_name, ' ', hr_users.last_name)
        //          END AS converse_name,
        //      hr_convo_participants.*, 
        //      hr_convo_inbox.*
        //  FROM 
        //      hr_convo_participants
        //  LEFT JOIN 
        //      hr_convo_inbox ON hr_convo_inbox.ID = hr_convo_participants.inbox_id
        //  LEFT JOIN 
        //      hr_convo_participants AS communicating_participant
        //      ON hr_convo_inbox.ID = communicating_participant.inbox_id
        //      AND hr_convo_participants.employee_id <> communicating_participant.employee_id
        //  LEFT JOIN hr_users ON hr_users.employee_id = communicating_participant.employee_id
        //  WHERE 
        //      hr_convo_participants.employee_id = ?
        //      AND hr_convo_inbox.ID = ?
        //  ORDER BY 
        //      hr_convo_inbox.last_modified ASC
        $this->setStatement("SELECT
        CASE
            WHEN :user_id = hr_convo_inbox.user_1 THEN hr_convo_inbox.user_2
            ELSE hr_convo_inbox.user_1
        END AS converse_id,
        
        CASE 
        WHEN converse_user.middle_name IS NOT NULL AND converse_user.middle_name <> '' THEN
            CONCAT(converse_user.first_name, ' ', SUBSTRING(converse_user.middle_name, 1, 1), '. ', converse_user.last_name)
        ELSE
            CONCAT(converse_user.first_name, ' ', converse_user.last_name)
        END AS converse_name,
        
        hr_convo_inbox.*
        FROM hr_convo_inbox
        INNER JOIN hr_users AS converse_user ON 
            (CASE WHEN :user_id = hr_convo_inbox.user_1 THEN hr_convo_inbox.user_2 ELSE hr_convo_inbox.user_1 END) = converse_user.employee_id
        WHERE 
        hr_convo_inbox.ID = :convo_id
        AND (hr_convo_inbox.user_1 = :user_id OR hr_convo_inbox.user_2 = :user_id)");
        $this->statement->execute(['user_id' => $employee_id, 'convo_id' => $convo_id]);
        return $this->statement->fetch();
    }

    function selectEmployeeConvoSettings($convo_id)
    {
        // SELECT 
        // hr_users.employee_id AS converse_id,
        //      CASE 
        //          WHEN hr_users.middle_name IS NOT NULL AND hr_users.middle_name <> '' THEN
        //              CONCAT(hr_users.first_name, ' ', SUBSTRING(hr_users.middle_name, 1, 1), '. ', hr_users.last_name)
        //          ELSE
        //              CONCAT(hr_users.first_name, ' ', hr_users.last_name)
        //          END AS converse_name,
        //      hr_convo_participants.*, 
        //      hr_convo_inbox.*
        //  FROM 
        //      hr_convo_participants
        //  LEFT JOIN 
        //      hr_convo_inbox ON hr_convo_inbox.ID = hr_convo_participants.inbox_id
        //  LEFT JOIN 
        //      hr_convo_participants AS communicating_participant
        //      ON hr_convo_inbox.ID = communicating_participant.inbox_id
        //      AND hr_convo_participants.employee_id <> communicating_participant.employee_id
        //  LEFT JOIN hr_users ON hr_users.employee_id = communicating_participant.employee_id
        //  WHERE 
        //      hr_convo_participants.employee_id = ?
        //      AND hr_convo_inbox.ID = ?
        //  ORDER BY 
        //      hr_convo_inbox.last_modified ASC
        $this->setStatement("SELECT
        CASE 
        WHEN converse_user_1.middle_name IS NOT NULL AND converse_user_1.middle_name <> '' THEN
            CONCAT(converse_user_1.first_name, ' ', SUBSTRING(converse_user_1.middle_name, 1, 1), '. ', converse_user_1.last_name)
        ELSE
            CONCAT(converse_user_1.first_name, ' ', converse_user_1.last_name)
        END AS converse_name_1,
        CASE 
        WHEN converse_user_2.middle_name IS NOT NULL AND converse_user_2.middle_name <> '' THEN
            CONCAT(converse_user_2.first_name, ' ', SUBSTRING(converse_user_2.middle_name, 1, 1), '. ', converse_user_2.last_name)
        ELSE
            CONCAT(converse_user_2.first_name, ' ', converse_user_2.last_name)
        END AS converse_name_2,
        hr_convo_inbox.*
        FROM hr_convo_inbox
        INNER JOIN hr_users AS converse_user_1 ON converse_user_1.employee_id = hr_convo_inbox.user_1
        INNER JOIN hr_users AS converse_user_2 ON converse_user_2.employee_id = hr_convo_inbox.user_2
        WHERE hr_convo_inbox.ID = ?");
        $this->statement->execute([$convo_id]);
        return $this->statement->fetch();
    }
    //Select Conversation
    function selectConvo($convo_id, $itemsPerPage, $offset)
    {
        $this->setStatement("
        SELECT 
        CASE 
        WHEN hr_users.middle_name IS NOT NULL AND hr_users.middle_name <> '' THEN
            CONCAT(hr_users.first_name, ' ', SUBSTRING(hr_users.middle_name, 1, 1), '. ', hr_users.last_name)
        ELSE
            CONCAT(hr_users.first_name, ' ', hr_users.last_name)
        END AS employee_name,
        hr_convo_messages.ID AS ID,
        hr_convo_messages.inbox_id AS inbox_id,
        hr_convo_messages.employee_id AS employee_id,
        hr_convo_messages.message_type AS message_type,
        hr_convo_messages.message AS message,
        hr_convo_messages.reply_id AS reply_id,
        hr_convo_messages.creation_date AS creation_date
        FROM hr_convo_messages 
        LEFT JOIN hr_users ON hr_users.employee_id = hr_convo_messages.employee_id
        WHERE hr_convo_messages.inbox_id = :inbox_id
        ORDER BY hr_convo_messages.ID DESC
        LIMIT {$itemsPerPage}
        OFFSET {$offset}
        ");
        $this->statement->execute([':inbox_id' => $convo_id]);
        return $this->statement->fetchAll();
    }
    //Insert New Message
    function insertNewMessage($employee_id, $convo_id, $message_type, $new_message, $reply_id)
    {
        $this->setStatement("
        START TRANSACTION;
        INSERT INTO hr_convo_messages (inbox_id, employee_id, message_type, message, reply_id, creation_date)
        VALUES (:inbox_id, :employee_id, :message_type, :message, :reply_id, :creation_date);
        
        UPDATE hr_convo_inbox
        SET last_sent_message = :message,
            last_sent_user_id = :employee_id
        WHERE ID = :inbox_id;
        
        COMMIT;
        ");
        $this->statement->execute([":inbox_id" => $convo_id, ":employee_id" => $employee_id, ":message_type" => $message_type, ":message" => $new_message, ":reply_id" => $reply_id, ":creation_date" => date('Y-m-d H:i:s')]);
        return $this->statement->fetchAll();
    }
    //delete Conversation
    function deleteConversation($convo_id)
    {
        $this->setStatement("DELETE FROM hr_convo_inbox WHERE ID = ?");
        return $this->statement->execute([$convo_id]);
    }

    function insertDiscussion($subject, $description)
    {
        $this->setStatement("INSERT INTO hr_request_discussion (consultation_subject, description) VALUES (:consultation_subject, :description)");
        if ($this->statement->execute([':consultation_subject' => $subject, ':description' => $description])) {
            return $this->connection->lastInsertId();
        }
    }
    function updateUserRequestConsultation($ID, $employee_id)
    {
        $this->setStatement("UPDATE hr_users SET request_consult = :request_consult WHERE employee_id = :employee_id");
        return $this->statement->execute([':request_consult' => $ID, ':employee_id' => $employee_id]);
    }
}
