import sqlite3
from datetime import datetime

import queries.queries as queries


class DataBaseHandler():
    """Handles data base handling, to decouple this logic from our api
    """
    def __init__(self, path=""):
        if path == "":
            raise Exception("Empty path")
        
        try:
            self.conn = sqlite3.connect(path, check_same_thread=False)
        except Exception as err:
            print("could not connect to sqlite3 database, ", err)
            return False

        self.cursor = self.conn.cursor() # getting a cursor

    def __populate_tools(self):
        # read csv and fill tools information
        return
    
    def create_operator(self, name, email):
        query = queries.CREATE_OPERATOR.format(name, email)

        print("LOG: creating operator query: ", query)
        self.conn.execute(query)
        self.conn.commit()

    def insert_task(self, name, status, deadline, description) -> int :
        """insert task to db and returns the id assigned on sql

        Args:
            name (str): task name
            status (str): task status
            deadline (str): task deadline in format: "YYYY-MM-dd"
            description (str): task description

        Returns:
            int: task id on sql
        """
        query = queries.CREATE_OPERATOR.format(name, status, deadline, description)

        print("LOG: inserting task query: ", query)
        self.conn.execute(query)
        self.conn.commit()


    
    def get_all_tools_from_task(self, taskId):
        """gets all tools assigned to the task `taskId`

        Args:
            taskId: task id from db

        Returns:
            array of tools in the format
            ```
            [{
            "id" : db_id,
            "name" : tool_name,
            "category" : tool_category,
            "sapCode" : tool_sapcode,
            },...]
            ```
        """
        query = queries.GET_ALL_TOOLS_FROM_TASK.format(taskId)
        print("LOG: getting tools from task query: ", query)
        rows = self.cursor.execute(query)

        messages = []

        for row in rows: 
            message = {
                "id": row[0],
                "name": row[1],
                "category": row[2],
                "sapCode": row[3],
            }
            messages.append(message)

        return messages

    
    def get_busy_tools(self):
        """get all ids from busy tools

        Returns:
            array of dict: [{id : }, {id :}], which id is the tool id
        """
        query = queries.GET_ALL_BUSY_TOOLS
        rows = self.cursor.execute(query)
        
        messages= []
        for row in rows:
            message = {
                "id" : row[0]
            }
            messages.append(message)
        
        return messages

    def get_tools(self, tools):
        response = []
        for tool in tools:
            query = queries.GET_TOOL.format(tool)
            rows = self.cursor.execute(query)
            response.append({
                "name" : rows[1],
                "category" : rows[2],
                "sapCode" : rows[3]
            })
        
        return response

   

if __name__ == "__main__":
    # test queries
    handler = DataBaseHandler(path="tasks.db")
    handler.populate_messages() 

