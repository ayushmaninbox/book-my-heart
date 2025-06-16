/// <reference path="../pb_data/types.d.ts" />

// Auto-create collections if they don't exist
onAfterBootstrap((e) => {
    // Create dates collection
    try {
        $app.dao().findCollectionByNameOrId("dates")
    } catch (err) {
        const datesCollection = new Collection({
            name: "dates",
            type: "base",
            schema: [
                {
                    name: "customId",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 50
                    }
                },
                {
                    name: "userId",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 50
                    }
                },
                {
                    name: "dateType",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 100
                    }
                },
                {
                    name: "partnerName",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 100
                    }
                },
                {
                    name: "partnerEmail",
                    type: "email",
                    required: false
                },
                {
                    name: "senderName",
                    type: "text",
                    required: false,
                    options: {
                        max: 100
                    }
                },
                {
                    name: "message",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 1000
                    }
                },
                {
                    name: "dateTime",
                    type: "text",
                    required: true
                },
                {
                    name: "meetingLink",
                    type: "url",
                    required: true
                },
                {
                    name: "spotifyPlaylist",
                    type: "url",
                    required: false
                }
            ]
        })
        
        $app.dao().saveCollection(datesCollection)
        console.log("Created dates collection")
    }

    // Create invites collection
    try {
        $app.dao().findCollectionByNameOrId("invites")
    } catch (err) {
        const invitesCollection = new Collection({
            name: "invites",
            type: "base",
            schema: [
                {
                    name: "dateId",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 50
                    }
                },
                {
                    name: "partnerEmail",
                    type: "email",
                    required: true
                },
                {
                    name: "partnerName",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 100
                    }
                },
                {
                    name: "dateType",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 100
                    }
                },
                {
                    name: "dateTime",
                    type: "text",
                    required: true
                },
                {
                    name: "message",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 1000
                    }
                },
                {
                    name: "meetingLink",
                    type: "url",
                    required: true
                },
                {
                    name: "spotifyPlaylist",
                    type: "url",
                    required: false
                },
                {
                    name: "inviteUrl",
                    type: "url",
                    required: true
                },
                {
                    name: "senderName",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 100
                    }
                },
                {
                    name: "emailSent",
                    type: "bool",
                    required: false
                }
            ]
        })
        
        $app.dao().saveCollection(invitesCollection)
        console.log("Created invites collection")
    }
})