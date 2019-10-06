<template>
    <v-card>
        <v-card-title class="_panel_border_bottom">
            <h3 >Register your app</h3>
               <v-spacer></v-spacer>
            <h5 class="header">Download the Repository here : <a href="https://github.com/eddremonts86/nordsenseApp" target="_blank" > NordSense</a></h5>

        </v-card-title>
        <v-card-text class="pa-8 docs_text">
             On your github account, go to settings -> OAuth Applications<br>
            This is the image when you register your application
            <img class="radio5" src="https://i.stack.imgur.com/JOWKa.png" width="100%"></img>

            <p class="title"> Get the Client ID and Client Secret.</p>
            This is the image after you receive Client ID and Client Secret
            <img class="radio5" src="https://i.stack.imgur.com/IStKU.png" width="100%"></img>


            <p class="title"> Ask for Github Code</p>
            Now you have Client ID. Go to this url.
            <br><b class="pa-3 my-3">https://github.com/login/oauth/authorize?client_id=b420627027b59e773f4f&scope=user:email,repo</b>
            <br>Please define your own client_id and scope.
            <p class="title"> Get the Github Code</p>
            Remember the Authorization callback URL you input when register? After you go to the link above, you should
            have redirected to your callback URL with the code as the parameter.<br>
            For example <b></b>http://localhost:8080/github/callback?code=ada5003057740988d8b1

        <p class="title"> Ask and Get the Access Token</p>
        Now you need to do http request post with Client ID, Client Secret, and Code you have got as the parameter.
        <br> Request POST<br>
        <b>https://github.com/login/oauth/access_token?client_id=a989cd9e8f0137ca6c29&client_secret=307d18600457b8d9eec1efeccee79e34c603c54b&code=ada5003057740988d8b1</b>
        <br>Response<br>
        <b>access_token=e72e16c7e42f292c6912e7710c838347ae178b4a&token_type=bearer</b>
        <p class="title"> Post Issue to Github</p>
        Now you have access token you can use it to access Github API.
        <pre>
            fetch('https://api.github.com/repos/organization/repo/issues?access_token=e72e16c7e42f292c6912e7710c838347ae178b4a', {
                  method: 'post',
                  body: {
                    title: 'Title',
                    body: {body: "body", title: "title"}
                  }
                })
        </pre>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "auth"
    }
</script>

<style scoped>
    .docs_text{
     font-size: 14px;
    }
</style>