#!/usr/bin/env python

import requests

from flask import Flask, request, jsonify
# import Auth

import sqlite3
import DB_Handler as db

# import gpt.api

class FlaskServer:
    def __init__(self):

        FlaskServer.app = Flask(__name__)
        self.app.add_url_rule('/', view_func=self.__root_callback, methods=["GET"])
        self.app.add_url_rule('/operator', view_func=self.__create_operator, methods=["POST"])
        self.app.add_url_rule('/task', view_func=self.__create_task, methods=["POST"])

        self.__db_handler = db.DataBaseHandler("data.db")

    def __root_callback(self):
        return jsonify({"status" : "ok"}), 200

    def __create_operator(self):
        try:
            # Parse JSON data from the request body
            data = request.get_json()

            # Validate required fields
            required_fields = ['name', 'email']
            for field in required_fields:
                if field not in data:
                    return jsonify({'error': f'Missing required field: {field}'}), 400

            # Extract fields from the JSON payload
            name = data['name']
            email = data['email']


            self.__db_handler.create_operator(name, email)
 
            return jsonify({
                'message': 'Operator created successfully',
                'operator': {
                    'name': name,
                    'email': email,
                }
            }), 201

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
    def __create_task(self):
        try:
            # Parse JSON data from the request body
            data = request.get_json()

            # Validate required fields
            required_fields = ['name', 'status', 'deadline', 'description']
            for field in required_fields:
                if field not in data:
                    return jsonify({'error': f'Missing required field: {field}'}), 400

            # Extract fields from the JSON payload
            name = data['name']
            status = data['status']
            deadline = data['deadline']
            description = data['description']


            self.__db_handler.insert_task(name, status, deadline, description)
 
            return jsonify({
                'message': 'task created successfully',
                'operator': {
                    'name': name,
                    'status' : status,
                    'deadline' : deadline,
                    'description' : description
                }
            }), 201

        except Exception as e:
            return jsonify({'error': str(e)}), 500