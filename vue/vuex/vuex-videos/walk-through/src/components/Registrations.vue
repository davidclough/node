<template>
    <div id="registrations">
        <div class="summary">
            <h3>Registrations</h3>
            <h5>Total: {{ total }}</h5>
        </div>
        <hr>
        <div class="row" v-for="registration in registrations">
            <h4>{{ registration.name }}</h4>
            <span @click="unregister(registration)">(Unregister)</span>
            <div class="date">{{ registration.date }}</div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from "vuex"

    export default {
        methods: {
            unregister(registration) {
                // const user = this.$store.state.users.find(user => {
                //     return user.id == registration.userId;
                // });
                // user.registered = false;
                // this.$store.state.registrations.splice(this.$store.state.registrations.indexOf(registration), 1);

                // Video 3.
                // this.$store.commit({
                //     type: "unregister",
                //     userId: registration.userId
                // })

                // Video 4.
                this.$store.dispatch({
                    type: "unregister",
                    userId: registration.userId
                })
            }
        },

        // computed: {
        //     registrations() {
        //         return this.$store.getters.registrations
        //     },
        //     total() {
        //         return this.$store.getters.totalRegistrations;
        //     }
        // }

        // computed: mapGetters(["registrations", "totalRegistrations"])

        // computed: mapGetters({
        //     registrations: "registrations",
        //     total: "totalRegistrations"
        // })

         computed: {
             // He installed babel-preset-stage-2
             // I was surprised at this as thought babel would be enough. However, the above package is installed by default when "vue init".
             // NOTE: We also had to an an additional "preset" within .babelrc:          ["stage-2"]
             ...mapGetters({
                registrations: "registrations",
                total: "totalRegistrations"
             })
             // ,    // CAN ADD ADDITIONAL methods which are not mapped to ones in the store
        }
   }
</script>

<style scoped>
    #registrations {
        box-shadow: 1px 1px 2px 1px #ccc;
        margin: 20px;
        padding: 20px;
        display: inline-block;
        width: 300px;
        vertical-align: top;
        text-align: left;
    }

    .summary {
        text-align: center;
    }

    .row h4 {
        display: inline-block;
        width: 30%;
        margin: 0 0 10px 0;
        box-sizing: border-box;
    }

    .row span {
        width: 30%;
        color: red;
        cursor: pointer;
    }

    .row span:hover {
        color: darkred;
    }

    .date {
        display: inline-block;
        width: 38%;
        text-align: right;
        box-sizing: border-box;
    }
</style>