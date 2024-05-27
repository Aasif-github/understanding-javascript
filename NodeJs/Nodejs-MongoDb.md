Q: What is the role of { new: true } in findByIdAndUpdate.

ans: In Mongoose, the findByIdAndUpdate method is used to find a document by its ID and update it with new values. The new: true option is used to return the updated document rather than the original document.

{ new: true }: Returns the modified document rather than the original. 

Although, it update the value in mongodb database but did not update in nodejs server.