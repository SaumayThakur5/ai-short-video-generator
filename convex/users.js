import {v} from "convex/values";
import {mutation, query} from "./_generated/server";

export const CreateNewUser = mutation({
    args:{
        name: v.string(),
        email: v.string(),
        pictureURL: v.string(),
    },
    handler: async(ctx , args)=>{
        const user= await ctx.db.query('users')
        .filter((q)=> q.eq(q.field('email'),args.email))
        .collect();

        if(!user[0]?.email){
            const result= await ctx.db.insert('users', {
                name: args.name,
                email: args.email,
                pictureURL: args?.pictureURL,
            })
            return result;
        }
        return user[0];
    }
})

// Add this query function
export const GetUserByEmail = query({
    args: { email: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .filter((q) => q.eq(q.field("email"), args.email))
            .first();
    },
});