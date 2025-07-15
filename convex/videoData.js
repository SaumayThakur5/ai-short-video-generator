
import { mutation, query } from "./_generated/server"
import {v} from "convex/values";

// Just add this simple function to your existing videoData.js
export const CreateVideoData = mutation({
    args: {
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        videoStyle: v.string(),
        caption: v.any(),
        voice: v.string(),
        uid: v.string(),
        createdBy: v.string(),
    },
    handler: async (ctx, args) => {
        const videoId = await ctx.db.insert("videoData", {
            ...args,
            createdAt: Date.now(),
            status: "pending",
        });
        return videoId;
    },
});

export const UpdateVideoRecord= mutation({
    args:{
        recordId:v.id('videoData'),
        audiourl: v.string(),
        images: v.optional(v.any()),
        captionJson: v.optional(v.any())
    },
    handler: async(ctx,args)=>{
        const result= await ctx.db.patch(args.recordId,{
            audiourl: args.audiourl,
            captionJson: args.captionJson,
            images: args.images,
            status: 'completed'
        }

        );
        return result
    }
})

export const GetUserVideos= query({
  args:{
    uid: v.string()
},
    handler: async(ctx, args)=>{
          const result= await ctx.db.query('videoData')
          .filter(q=> q.eq(q.field('uid'), args.uid))
          .order('desc')
          .collect();

          return result;
    }
})

export const GetVideoById = query({
     args:{
        videoId: v.string()
     },
     handler: async(ctx, args)=>{
        const result = await ctx.db.get(args.videoId)
        return result;
     }
})