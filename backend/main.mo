import Text "mo:base/Text";

import Array "mo:base/Array";

actor {
    stable var posts : [Post] = [];

    type Post = {
        title: Text;
        author: Text;
        body: Text;
    };

    public func addPost(title: Text, author: Text, body: Text) : async () {
        let newPost : Post = { title; author; body };
        posts := Array.append([newPost], posts);
    };

    public query func getPosts() : async [Post] {
        return posts;
    };
}
