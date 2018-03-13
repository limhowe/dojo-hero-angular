/**
 * db.ts
 * Library that handles the object insert onto local storage
 * Reference: https://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673
 */

import { Injectable } from '@angular/core';
import { Common } from './common';
import { DBMapper } from '../models/dbMapper';

@Injectable()
export class HeroStorage {
  indexedDBObj: any;

  constructor() {
    if (Common.isBrowser() && ("indexedDB" in window)) {
      this.opendb();
    }
  }

  opendb() {
    return new Promise((success, error) => {
      this.indexedDBObj = indexedDB.open('heroDojo', 1);
      this.indexedDBObj.onsuccess = function(e) {
        success(e.target.result);
      };
      this.indexedDBObj.onerror = function(e) {
        error(e);
      };
      this.indexedDBObj.onupgradeneeded = function(e) {
        let heroDB = e.target.result;

        for (let key in DBMapper) {
          if (!heroDB.objectStoreNames.contains(key)) {
            heroDB.createObjectStore(key, {autoIncrement: true});
          }
        }
      };
    });
  }

  save(_modelName: string, _data: any) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        let transaction = db.transaction([_modelName], "readwrite");
        let model = transaction.objectStore(_modelName);
        let request = model.add(_data);
        request.onsuccess = function() {
          success({
            ok: true,
            message: `Record stored correctly on table: ${_modelName}`,
          });
        };
        request.onerror = function(e) {
          error(e);
        }
      })
      .catch((e) => {
        error(e);
      });
    });
  }

  get(_modelName: string, _key: number) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        let transaction = db.transaction([_modelName], "readonly");
        let model = transaction.objectStore(_modelName);
        let request = model.get(_key);
        request.onsuccess = function(_data) {
          var result = _data.target.result;
          success({
            ok: true,
            data: result
          });
        };
        request.onerror = function(e) {
          error(e);
        }
      })
      .catch((e) => {
        error(e);
      });
    });
  }

  getAll(_modelName: string) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        var trans = db.transaction(_modelName, IDBTransaction.READ_ONLY);
        var store = trans.objectStore(_modelName);
        var items = [];
        var cursorRequest = store.openCursor();

        trans.oncomplete = function(evt) {
            success({
              data: items
            });
        };

        cursorRequest.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
              // Adding db key to value object
              cursor.value.dbKey = cursor.key;
              items.push(cursor.value);
              cursor.continue();
            }
        };
      })
      .catch((e) => {
        error(e);
      });
    });
  }

  getNext(_modelName: string, dbKey: number, limit: number = 10) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        var trans = db.transaction(_modelName, IDBTransaction.READ_ONLY);
        var store = trans.objectStore(_modelName);
        var items = [];
        var cursorRequest;
        if (dbKey) {
          var range = IDBKeyRange.lowerBound(Number(dbKey)+1);
          console.log('range = ', range, dbKey)
          cursorRequest =  store.openCursor(range)
        } else {
            console.log('no range', dbKey)
            cursorRequest = store.openCursor();
        }

        trans.oncomplete = function(evt) {
            success({
              data: items
            });
        };

        cursorRequest.onsuccess = function(evt) {
            var cursor = evt.target.result;
            if (cursor) {
              // Adding db key to value object
              cursor.value.dbKey = cursor.key;
              console.log('getting key = ',cursor.key)
              items.push(cursor.value);
              if (items.length < limit) {
                  cursor.continue();
              }
            }
        };
      })
      .catch((e) => {
        error(e);
      });
    });
  }

  update(_modelName: string, _data: any, _key: number) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        let transaction = db.transaction([_modelName], "readwrite");
        let model = transaction.objectStore(_modelName);
        let request = model.put(_data, _key);
        request.onsuccess = function() {
          success({
            ok: true,
            message: `Record updated correctly on table: ${_modelName}`,
          });
        };
        request.onerror = function(e) {
          error(e);
        }
      })
      .catch((e) => {
        error(e);
      });
    });
  }

  delete(_modelName: string, _key: number) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        let transaction = db.transaction([_modelName], "readwrite");
        let model = transaction.objectStore(_modelName);
        let request = model.delete(_key);
        request.onsuccess = function(_data) {
          var result = _data.target.result;
          success({
            ok: true,
            message: `Object deleted from ${_modelName}`,
          });
        };
        request.onerror = function(e) {
          error(e);
        }
      })
      .catch((e) => {
        error(e);
      });
    });
  }

  clear(_modelName: string) {
    return new Promise((success, error) => {
      this
      .opendb()
      .then((db: any) => {
        try {
          let transaction = db.transaction([_modelName], "readwrite");
          let model = transaction.objectStore(_modelName);
          let request = model.clear();
          request.onsuccess = function(_data) {
            success({
              ok: true,
              message: `Object ${_modelName} cleared`,
            });
          };
          request.onerror = function(e) {
            error(e);
          }
        } catch (e) {
          error({
            ok: false,
            message: `Object ${_modelName} does not exists`,
          });
        }
      })
      .catch((e) => {
        error(e);
      });
    });
  }
}
