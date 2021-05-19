(() => {
    async function outputInstPosts(container) {
        try {
            let clientId     = '17841429131206904';
            let clientToken  = 'IGQVJVMURhQ2NvWjZAqVnU2NDdUam1HQ2FpMVRuUVBURnJBNEVHWklZATWZAzeUxVSXg1VzVoelZABS0lqejlJU19HV0dZAbC1FT05xUGJRYkpkSDR1TVBYNDZAqRjNIekdLY1pfNWdaNF9n';
            let clientFields = 'username,media_type,media_url,caption,timestamp,thumbnail_url,permalink';
            let postsLimit   = '10';
            let url          = `https://graph.instagram.com/${clientId}/media?fields=${clientFields}&limit=${postsLimit}&access_token=${clientToken}`;
            const jsonData = await fetch(url)
                .then((response) => response.json());

            let postsData = jsonData.data;
            
            let outputLimit = 4;

            for (i = 0; i < outputLimit; i++) {
                let postsContainer = document.createElement('div');
                postsContainer.classList.add('common');

                let img = document.createElement('img');
                img.setAttribute('alt', postsData[i].caption);
                img.setAttribute('src', postsData[i].media_url);

                postsContainer.append(img);

                container.append(postsContainer);
            }

        } catch(e) {
            console.error("Error: ", e);
            container.parentElement.remove();
        }
    }

    const instagramContainer = document.querySelector("#inst-container");
    instagramContainer && outputInstPosts(instagramContainer);
})();