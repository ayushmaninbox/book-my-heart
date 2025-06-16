/// <reference path="../pb_data/types.d.ts" />

// Auto-create collections if they don't exist
onAfterBootstrap((e) => {
    console.log("🚀 BookMyHeart: Initializing database schema...")

    // Create dates collection
    try {
        $app.dao().findCollectionByNameOrId("dates")
        console.log("✅ dates collection already exists")
    } catch (err) {
        console.log("📝 Creating dates collection...")
        
        const datesCollection = new Collection({
            name: "dates",
            type: "base",
            schema: [
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
                    name: "date",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 20
                    }
                },
                {
                    name: "time",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 10
                    }
                },
                {
                    name: "dateTime",
                    type: "text",
                    required: true,
                    options: {
                        min: 1,
                        max: 50
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
                }
            ],
            listRule: "",  // Allow public read
            viewRule: "",  // Allow public read
            createRule: "", // Allow public create
            updateRule: "", // Allow public update
            deleteRule: ""  // Allow public delete
        })
        
        $app.dao().saveCollection(datesCollection)
        console.log("✅ Created dates collection successfully")
    }

    // Create invites collection
    try {
        $app.dao().findCollectionByNameOrId("invites")
        console.log("✅ invites collection already exists")
    } catch (err) {
        console.log("📝 Creating invites collection...")
        
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
                    required: true,
                    options: {
                        min: 1,
                        max: 50
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
            ],
            listRule: "",  // Allow public read
            viewRule: "",  // Allow public read
            createRule: "", // Allow public create
            updateRule: "", // Allow public update
            deleteRule: ""  // Allow public delete
        })
        
        $app.dao().saveCollection(invitesCollection)
        console.log("✅ Created invites collection successfully")
    }

    console.log("🎉 BookMyHeart: Database schema initialization complete!")
})