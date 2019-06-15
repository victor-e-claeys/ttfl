const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const db = low(new FileSync('db.json'));

db.defaults({posts: [], users: [], comments: []}).write();

db.get('posts').push(
    {
        "id": "462493170453287_952789168090349",
        "created_time": 1456919584000,
        "from":{"name":"Michael Webb","id":"661311360571317"},
        "message": "Hey, Quatloosers, GO FUCK YOURSELVES :P",
        "type": "status",
        "comments": [
          {
            "id": "952861951416404",
            "attachment": {
              "media": {
                "image": {
                  "height": 240,
                  "src": "https://scontent.xx.fbcdn.net/v/t1.0-9/1931281_10205863081323186_5797212129715532518_n.jpg?_nc_cat=0&oh=eafff4eaa00a04f27f2383c887695171&oe=5B2712F4",
                  "width": 320
                }
              },
              "target": {
                "id": "10205863081323186",
                "url": "https://www.facebook.com/photo.php?fbid=10205863081323186&set=p.10205863081323186&type=3"
              },
              "type": "photo",
              "url": "https://www.facebook.com/photo.php?fbid=10205863081323186&set=p.10205863081323186&type=3"
            },
            "comment_count": 0,
            "created_time": 1456932514000,
            "message": ":D HAHAHAHA!!!!!!"
          },
          {
            "id": "952859898083276",
            "comment_count": 0,
            "created_time": 1456932102000,
            "message": "The best they can do is send in Dan and have him create shit stains.  Now they have Dan in the gimp suit praying to magic parchment that the Streisand effect doesn't occur"
          },
          {
            "id": "952861768083089",
            "attachment": {
              "media": {
                "image": {
                  "height": 540,
                  "src": "https://scontent.xx.fbcdn.net/v/t1.0-0/q82/p180x540/12512279_10205863079443139_1293846837146889554_n.jpg?_nc_cat=0&oh=5a14c207734df70cc7dc1d7dbdf2a308&oe=5B6619D5",
                  "width": 720
                }
              },
              "target": {
                "id": "10205863079443139",
                "url": "https://www.facebook.com/photo.php?fbid=10205863079443139&set=p.10205863079443139&type=3"
              },
              "type": "photo",
              "url": "https://www.facebook.com/photo.php?fbid=10205863079443139&set=p.10205863079443139&type=3"
            },
            "comment_count": 0,
            "created_time": 1456932478000,
            "message": ":D"
          },
          {
            "id": "952789591423640",
            "comment_count": 0,
            "created_time": 1456919664000,
            "message": "Especially YOU, Burnbaby69 :D"
          },
          {
            "id": "952789534756979",
            "attachment": {
              "description": "You can find the lyrics to and more information about this recording on my favorite lyrics website at: http://www.mp3lyrics.org/s/smokey-robinson/i-second-th...",
              "media": {
                "image": {
                  "height": 360,
                  "src": "https://external.xx.fbcdn.net/safe_image.php?d=AQDWWp8oWtgxQRyd&w=720&h=720&url=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fsti_tuBiv5g%2Fhqdefault.jpg&cfs=1&_nc_hash=AQAB88JbmTGZKIZ5",
                  "width": 360
                }
              },
              "target": {
                "url": "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dsti_tuBiv5g&h=ATPBVTg4_5LgDGaXS5sP8o8hfL228dOe7KU0pJlgX4MCrKwhHs9fllD3p1c-asGXRgW3WR5tnvpmqBXr2FA-2xk3NazgJoINDgx2LQmhawy8&s=1"
              },
              "title": "\"I Second That Emotion\" by Smokey Robinson & The Miracles",
              "type": "video_share_youtube",
              "url": "https://l.facebook.com/l.php?u=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dsti_tuBiv5g&h=ATPBVTg4_5LgDGaXS5sP8o8hfL228dOe7KU0pJlgX4MCrKwhHs9fllD3p1c-asGXRgW3WR5tnvpmqBXr2FA-2xk3NazgJoINDgx2LQmhawy8&s=1"
            },
            "comment_count": 0,
            "created_time": 1456919647000,
            "message": "https://www.youtube.com/watch?v=sti_tuBiv5g"
          }
        ]
      }
).write();

console.log(db.get('posts').find({from:{id:"661311360571317"}}).value());