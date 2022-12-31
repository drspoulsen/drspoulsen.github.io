function createCommentEl(response){
    let user = document.createElement('div');
    user.classList.add('mastodon-comment');
    let userAvatar = document.createElement('img');
    userAvatar.classList.add('avatar');
    userAvatar.setAttribute('height', 60 ); 
    userAvatar.setAttribute('width', 60 ); 
    userAvatar.setAttribute('src',response.account.avatar_static);
    user.appendChild(userAvatar);
    let userLink = document.createElement('a');
    userLink.setAttribute('href',response.account.url);
    userLink.classList.add('comment-author');
    for (let j = 0; j < response.account.emojis.length;j++){
        let emoji = response.account.emojis[j];
        response.account.display_name = response.account.display_name.replace(`:${emoji.shortcode}:`, `<img src="${emoji.static_url}" alt="Emoji ${emoji.shortcode}" height="16px" width="16px" />`);
    }
    userLink.innerHTML = response.account.display_name + ' @' + response.account.username;

    let commentDate = document.createElement('a');
    commentDate.classList.add('comment-date'); commentDate.setAttribute('href',response.url); commentDate.innerHTML = response.created_at.substr(0,10);

    let commentContents = document.createElement('div');
    commentContents.classList.add('mastodon-comment-content'); commentContents.innerHTML = response.content;

    let comment = document.createElement('div');
    comment.classList.add( 'comment-content' );

    user.appendChild( comment );
    comment.appendChild( userLink );
    comment.appendChild(commentDate);
    comment.appendChild( commentContents );
    return user;
}
