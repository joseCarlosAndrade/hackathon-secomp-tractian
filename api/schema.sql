CREATE TABLE "operators" (
    "id"  INTEGER,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL


    PRIMARY KEY("id")
);

CREATE TABLE "tasks" (
    "id" INTEGER,
    "name" TEXT NOT NULL,
    "status" TEXT, -- done, in progess, to do, blocked
    "deadline" NUMERIC NOT NULL,
    "description" TEXT
    PRIMARY KEY("id")
);

CREATE TABLE "tools" (
    "id" INTEGER,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sapCode" TEXT NOT NULL
    PRIMARY KEY ("id")
);

CREATE TABLE "assignmentes" (
    "id" INTEGER ,
    "operator_id" INTEGER,
    "task_id" INTEGER,    

    PRIMARY KEY ("id"),
    FOREIGN KEY("operator_id") REFERENCES "operators"("id"),
    FOREIGN KEY("task_id") REFERENCES "tasks"("id"),

);

CREATE TABLE "using_tools" (
    "id" INTEGER ,
    
    "task_id" INTEGER,   
    "tool_id" INTEGER, 

    PRIMARY KEY ("id"),
    FOREIGN KEY("task_id") REFERENCES "tasks"("id"),
    FOREIGN KEY("tool_id") REFERENCES "tools"("id"),
);

-- //
/*
usuarios -> 0 to many tasks

task -> 1 to many tools 
*/

/*
SELECT "name", "sapCode" FROM (
    SELECT 

)

SELECT * FROM "assignments" WHERE "task_id" = "1"

// consultar todas as ferramentas necessarias para esta tarefa
SELECT "tool_id" FROM "using_tools" WHERE "task_id" = "1" ; -> retorna array de tools ids;

// consultar todas as ferramentas indisponiveis
selectionar todas as tarefas em andamento
SELECT "tool_id" FROM "using_tools" WHERE "taks_id" =(SELECT "id" FROM "tasks" WHERE "status" = "in_progress")


// create user
INSERT INTO "operators" ("name", "email")
VALUES
({}, {})
*/
