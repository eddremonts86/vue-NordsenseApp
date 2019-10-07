<template>
    <v-app id="inspire">
        <v-app-bar app clipped-left>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>NordSense</v-toolbar-title>
            <v-spacer></v-spacer>
            <b><a href="/docs"> Documentation</a> / <a href="https://github.com/eddremonts86/nordsenseApp"
                                                       target="_blank"> Git Repository</a></b>
        </v-app-bar>

        <v-content>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-content>

        <v-footer app>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String
        },
        data: () => ({
            drawer: null
        }),
        created() {
            this.$vuetify.theme.dark = true;
        }
    };
</script>
