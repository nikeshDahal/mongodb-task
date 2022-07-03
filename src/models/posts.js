const mongoose = require("mongoose");
const User = require("../models/users");

//schema for location
const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  _id: false,
  timestamps: false,
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    location: locationSchema,
  },
  {
    timestamps: true,
  }
);


//............................fetching all posts with post owner details, comments, replies.................//
postSchema.statics.listAllPosts = async function () {
  try {
    return this.aggregate([
      {
        //stage1 for validation and to get posted by details
        //validation of post
        $lookup: {
          from: "users",
          let: { userId: "$postedBy" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ["$_id", "$$userId"],
                    },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 0,
                email: 0,
                password: 0,
                tokens: 0,
                createdAt: 0,
                updatedAt: 0,
              },
            },
          ],
          as: "postedBy",
        },
      }, //validation ended
      //stage 2 for sorting the posts on the basis of date
      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        //stage3 to get comment  details
        $lookup: {
          from: "comments",
          let: { /*new variable*/post_Id: "$_id"/*id in postable*/ },
          pipeline: [
            {
              $match: { $expr: { $and: [{ $eq: [/* post id in commentable*/"$postId", "$$post_Id"/*declared varaible form let */ ] }] } },
            },
            {
              $project: {
                createdAt: 0,
                updatedAt: 0,
              },
            },
            {
              $sort: {
                createdAt: -1,
              },
            },
            {
              $limit: 3,
            },
            {
              $lookup:{
                from:"replies",
                let:{comment_Id:"$_id"},
                pipeline:[
                  {
                    $match: { $expr: { $and: [{ $eq: ["$commentId", "$$comment_Id"] }] } }
                  },
                  {
                    $project: {
                      _id:0
                    },
                  },
                  {
                    $limit: 1,
                  },
                ],
                as:"replies"
              }
            },
          ],
          as: "comments",
        },
      },
      //stage 4 for projection 
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      },
      //last stage
      {
        $limit: 10,
      },
    ]);
  } catch (error) {
    throw error;
  }
};


//.............................fetching all post within 600m from my location.................................//

postSchema.statics.listAllPostsNearMe = async function (cords) {
  try {
    console.log('cords',cords)
    return this.aggregate([
      {
        $geoNear:{
          near:{
            type:"Point",
            coordinates:cords
          },
          key:"location",
          maxDistance:2000,
          distanceField:"dist.distanceFromMyLocation",
          spherical:true
        }
      }

    ])
  } catch (error) {
    throw error;
  }
};

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
