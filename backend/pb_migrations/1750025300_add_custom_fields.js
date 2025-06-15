/// <reference path="../pb_data/types.d.ts" />

/*
  # Add custom fields to collections

  1. Updates to dates collection
    - Add `customId` field for frontend compatibility
    - Add `userId` field for user association
    - Add `senderName` field for sender identification
    - Add `spotifyPlaylist` field for music integration
    - Add `meetingLink` field for video calls

  2. Updates to invites collection  
    - Add `dateId` field to link with dates
    - Add `inviteUrl` field for invite links
    - Add `senderName` field for sender identification
    - Add `emailSent` field to track email status

  3. Security
    - Maintain existing RLS policies
*/

migrate((app) => {
  // Update dates collection
  const datesCollection = app.findCollectionByNameOrId("pbc_1613920245")
  
  // Add missing fields to dates collection
  const datesFields = [
    {
      "id": "customid001",
      "name": "customId",
      "type": "text",
      "required": false,
      "unique": true,
      "options": {
        "min": null,
        "max": 15,
        "pattern": ""
      }
    },
    {
      "id": "userid001", 
      "name": "userId",
      "type": "text",
      "required": true,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "id": "sendername001",
      "name": "senderName", 
      "type": "text",
      "required": false,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "id": "spotify001",
      "name": "spotifyPlaylist",
      "type": "url",
      "required": false,
      "unique": false,
      "options": {
        "exceptDomains": null,
        "onlyDomains": null
      }
    },
    {
      "id": "meeting001",
      "name": "meetingLink", 
      "type": "url",
      "required": true,
      "unique": false,
      "options": {
        "exceptDomains": null,
        "onlyDomains": null
      }
    }
  ]

  // Add fields to dates collection
  datesFields.forEach(field => {
    try {
      datesCollection.schema.addField(new SchemaField(field))
    } catch (e) {
      console.log(`Field ${field.name} might already exist in dates collection`)
    }
  })

  // Update invites collection
  const invitesCollection = app.findCollectionByNameOrId("pbc_2452428166")
  
  // Add missing fields to invites collection
  const invitesFields = [
    {
      "id": "dateid001",
      "name": "dateId",
      "type": "text", 
      "required": true,
      "unique": false,
      "options": {
        "min": null,
        "max": 15,
        "pattern": ""
      }
    },
    {
      "id": "inviteurl001",
      "name": "inviteUrl",
      "type": "url",
      "required": false,
      "unique": false,
      "options": {
        "exceptDomains": null,
        "onlyDomains": null
      }
    },
    {
      "id": "sendername002", 
      "name": "senderName",
      "type": "text",
      "required": false,
      "unique": false,
      "options": {
        "min": null,
        "max": null,
        "pattern": ""
      }
    },
    {
      "id": "emailsent001",
      "name": "emailSent",
      "type": "bool",
      "required": false,
      "unique": false,
      "options": {}
    },
    {
      "id": "spotify002",
      "name": "spotifyPlaylist",
      "type": "url", 
      "required": false,
      "unique": false,
      "options": {
        "exceptDomains": null,
        "onlyDomains": null
      }
    },
    {
      "id": "meeting002",
      "name": "meetingLink",
      "type": "url",
      "required": false,
      "unique": false,
      "options": {
        "exceptDomains": null,
        "onlyDomains": null
      }
    }
  ]

  // Add fields to invites collection
  invitesFields.forEach(field => {
    try {
      invitesCollection.schema.addField(new SchemaField(field))
    } catch (e) {
      console.log(`Field ${field.name} might already exist in invites collection`)
    }
  })

  return app.save(datesCollection) && app.save(invitesCollection)
}, (app) => {
  // Rollback - remove the added fields
  const datesCollection = app.findCollectionByNameOrId("pbc_1613920245")
  const invitesCollection = app.findCollectionByNameOrId("pbc_2452428166")
  
  // Remove fields from dates collection
  const datesFieldsToRemove = ["customId", "userId", "senderName", "spotifyPlaylist", "meetingLink"]
  datesFieldsToRemove.forEach(fieldName => {
    try {
      datesCollection.schema.removeField(fieldName)
    } catch (e) {
      console.log(`Could not remove field ${fieldName} from dates collection`)
    }
  })

  // Remove fields from invites collection  
  const invitesFieldsToRemove = ["dateId", "inviteUrl", "senderName", "emailSent", "spotifyPlaylist", "meetingLink"]
  invitesFieldsToRemove.forEach(fieldName => {
    try {
      invitesCollection.schema.removeField(fieldName)
    } catch (e) {
      console.log(`Could not remove field ${fieldName} from invites collection`)
    }
  })

  return app.save(datesCollection) && app.save(invitesCollection)
})