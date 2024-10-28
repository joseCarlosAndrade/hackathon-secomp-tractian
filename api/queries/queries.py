
CREATE_OPERATOR="""
INSERT INTO "operators" ("name", "email")
VALUES
("{}, "{}")
"""

CREATE_TASK="""
INSERT INTO "tasks" ("name", "status", "deadline", "description")
VALUES
("{}", "{}", "{}", "{}")
""" 

GET_TASK_ID="""
SELECT "id" FROM "tasks" WHERE "name" = "{}" AND "deadline" = "{}" """

GET_TOOL="""
SELECT * FROM "tools" WHERE "id" = "{}"
"""

GET_ALL_TOOLS_FROM_TASK="""
SELECT "tool_id" FROM "using_tools" WHERE "task_id" = "{}"
"""

GET_ALL_BUSY_TOOLS="""
SELECT "tool_id" FROM "using_tools" WHERE "taks_id" = (SELECT "id" FROM "tasks" WHERE "status" = "in_progress")
"""