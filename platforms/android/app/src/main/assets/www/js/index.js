/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        $('#btnNuevo').on('click', function(){
            alert("Clic");
        });

        $('#txtCampo1').keyup(function(){
            var texto = $('#txtCampo1').val();
            $('#txtCampo2').val(texto);
        });
        
        $('#crearBD').on('click', function(){
            
            var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){
                alert("Se creo la base");
            }, function(){
                alert("Ocurrio un error");
            });
            
            db.transaction(function(tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS DemoTable (name, score)');
                tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Alice', 101]);
                tx.executeSql('INSERT INTO DemoTable VALUES (?,?)', ['Betty', 202]);
              }, function(error) {
                alert('Transaction ERROR: ' + error.message);
              }, function() {
                alert('Populated database OK');
              });
                /*window.sqlitePlugin.echoTest(function() {
                  alert('ECHO test OK');
                });*/
                
        });

        $('#buscarBD').on('click', function(){
            var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){                
            }, function(){
                alert("Ocurrio un error");
            });

            db.transaction(function(tx) {
                tx.executeSql('SELECT count(*) AS mycount FROM DemoTable', [], function(tx, rs) {
                  alert('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
                /*tx.executeSql('SELECT name FROM DemoTable WHERE name = ', ['Alice'], function(tx, rs) {
                  alert(rs.rows.length);*/
                }, function(tx, error) {
                  alert('SELECT error: ' + error.message);
                });
              });

        });

        $('#borrarBD').on('click', function(){
            var db = window.sqlitePlugin.openDatabase({name: "base.db", location: "default"}, function(){                
            }, function(){
                alert("Ocurrio un error");
            });

            db.transaction(function(tx) {
                myDB.transaction(function(transaction) {
                    var executeQuery = "DELETE FROM DemoTable where name=?";
                    transaction.executeSql(executeQuery, ['Alice'],
                    //On Success
                    function(tx, result) {alert('Delete successfully');},
                    //On Error
                    function(error){alert('Something went Wrong');});
                    });

                
              });
        });



    },
    

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};

app.initialize();