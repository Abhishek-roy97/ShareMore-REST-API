import ApplicationError from "../../middlewares/application.error.middleware.js";

export default class PostModel {
    constructor(id, userId, caption, imageUrl){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.savedPost = [];
        this.archived = false;
        this.bookmarked = [];
    }
    //Get All Posts
    static getAll(){
        return posts;
    }
    //Add a new Post
    static add(userId, caption, imageUrl){
        let newPost = new PostModel(posts.length + 1, userId, caption, imageUrl);
        posts.push(newPost);
        return newPost;
    }
    //Get Post By Id
    static getById(id){
        let post = posts.find((p)=> p.id == id);
        if (!post) {
            throw new ApplicationError("Post not found for the given Id", 400);
          }
          return post;
    }
    //Get Post By UserId
    static getUserPost(userId){
        let post = posts.filter((p)=> p.userId == userId);
        if (!post) {
            throw new ApplicationError("Post not found for the following User", 400);
          }
          return post;
    }
    //Update a Post with post id and userId
    static update(id, userId, caption, imageUrl){
        const index = posts.findIndex((p)=> p.id == id && p.userId == userId);
        if(index == -1){
            throw new ApplicationError(
                "you are not authorized to update this post",
                403
              );
        }else{
            posts[index] = {...posts[index],caption,imageUrl}
            //console.log(posts[index]);
            return posts[index];
        }
    }
    //Remove a Post 
    static remove(postId, userId){
        const index = posts.findIndex((p)=> p.id == postId && p.userId == userId);
        if(index == -1){
            throw new ApplicationError(
                "you are not authorized  to delete this post",
                403
              ); 
        }else{
            posts.splice(index, 1);
        }
    }
    //Filter Posts by caption
    static getByCaption(caption){
        // console.log("filtering by caption:", caption);
        if (!caption.trim()) {
          throw new ApplicationError("Caption must be entered to filter.", 400);
        } 
        const inputCaption = caption.toLowerCase();   //converting caption to lower case
        const post = posts.filter((p)=> p.caption.toLowerCase().includes(inputCaption));
        if(post.length === 0){
            throw new ApplicationError(
                "No posts found with the provided caption.",
                400
              );
        }
        // console.log("Filtered posts:", post);
        return post;
    }  
    //Save Post by user
    static save(postId, userId){
        const post = posts.find((p)=> p.id == postId);
        if(!post){
            throw new ApplicationError("Post not found", 404);
        }
        if(post.savedPost.includes(userId)){
            throw new ApplicationError("Post already saved by the user", 400);

        }
        post.savedPost.push(userId);
    }
    // Archieve Post by User
    static archivePost(postId){
        const post = posts.find((p)=> p.id == postId);
        if(!post){
            throw new ApplicationError("Post not found", 404);
        }
        post.archived = true;
    } 
    //BookMark Post
    static bookMark(postId, userId){
        const post = posts.find((p)=> p.id == postId);
        if(!post){
            throw new ApplicationError("Post not found", 404); 
        }
        if(post.bookmarked.includes(userId)){
            throw new ApplicationError("Post already bookmarked by the user", 400);
        }
        post.bookmarked.push(userId);
    }

}

var posts = [
    new PostModel(
        1,
        1,
        "Roads to Heaven",
        "https://images.pexels.com/photos/1955134/pexels-photo-1955134.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        
    ),
    new PostModel(
        2,
        2,
        "Escape the reality",
        "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ),
    new PostModel(
        3,
        2,
        "Best Dinner Ever",
        "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    )
]