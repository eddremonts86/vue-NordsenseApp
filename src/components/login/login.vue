<template>
    <div class="hello">
        <button @click="authenticate('github')">auth Github</button>
    </div>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        data() {
            return {}
        },
        methods: {
            authenticate: function (provider) {
                this.$auth.authenticate(provider).then(function (response) {
                    this.$auth.setToken(response.data);
                }, this).catch(
                    console.log(this.$auth.getToken()))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
