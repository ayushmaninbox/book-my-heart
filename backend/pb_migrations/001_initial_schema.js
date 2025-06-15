/// <reference path="../pb_data/types.d.ts" />

migrate((db) => {
  // Create dates collection
  const datesCollection = new Collection({
    "id": "dates_collection",
    "created": "2025-01-15 10:00:00.000Z",
    "updated": "2025-01-15 10:00:00.000Z",
    "name": "dates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "userid_field",
        "name": "userId",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "datetype_field",
        "name": "dateType",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "partnername_field",
        "name": "partnerName",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "partneremail_field",
        "name": "partnerEmail",
        "type": "email",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "sendername_field",
        "name": "senderName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "message_field",
        "name": "message",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "date_field",
        "name": "date",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "time_field",
        "name": "time",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "datetime_field",
        "name": "dateTime",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "meetinglink_field",
        "name": "meetingLink",
        "type": "url",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "spotifyplaylist_field",
        "name": "spotifyPlaylist",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_dates_userId` ON `dates` (`userId`)",
      "CREATE INDEX `idx_dates_dateTime` ON `dates` (`dateTime`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  })

  // Create invites collection
  const invitesCollection = new Collection({
    "id": "invites_collection",
    "created": "2025-01-15 10:00:00.000Z",
    "updated": "2025-01-15 10:00:00.000Z",
    "name": "invites",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "dateid_field",
        "name": "dateId",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "partneremail_field",
        "name": "partnerEmail",
        "type": "email",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "partnername_field",
        "name": "partnerName",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "datetype_field",
        "name": "dateType",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "datetime_field",
        "name": "dateTime",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "message_field",
        "name": "message",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "meetinglink_field",
        "name": "meetingLink",
        "type": "url",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "spotifyplaylist_field",
        "name": "spotifyPlaylist",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "inviteurl_field",
        "name": "inviteUrl",
        "type": "url",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": null,
          "onlyDomains": null
        }
      },
      {
        "system": false,
        "id": "sendername_field",
        "name": "senderName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "emailsent_field",
        "name": "emailSent",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_invites_dateId` ON `invites` (`dateId`)",
      "CREATE INDEX `idx_invites_partnerEmail` ON `invites` (`partnerEmail`)",
      "CREATE INDEX `idx_invites_dateTime` ON `invites` (`dateTime`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  })

  return Dao(db).saveCollection(datesCollection) && Dao(db).saveCollection(invitesCollection)
}, (db) => {
  // Rollback - delete collections
  const dao = new Dao(db)
  
  try {
    dao.deleteCollection(dao.findCollectionByNameOrId("dates"))
  } catch (e) {
    console.log("dates collection not found during rollback")
  }
  
  try {
    dao.deleteCollection(dao.findCollectionByNameOrId("invites"))
  } catch (e) {
    console.log("invites collection not found during rollback")
  }
  
  return null
})