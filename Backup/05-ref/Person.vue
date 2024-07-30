<template>
    <div class="person">

        <h1>Hello!</h1>
        <h2>Name :{{ name }}</h2>
        <h2>Age :{{ age }}</h2>
        <h2>Address :{{ address }}</h2>
        <button @click="editName">Edit Name</button>
        <button @click="editAge">Edit Age</button>
        <button @click="showTel"> Show Tell</button>
        <button>123</button>

    </div>
</template>

<!-- <script lang="ts">
export default {
    name:'Person123',

}
</script> -->

<script lang="ts" setup name="Person">
import { ref } from 'vue'

    let name = ref('James')
    let age = ref(40)
    let address = ref('New York')
    let tel = '5555-5555'

        function editName(){
            name.value = 'James Harden'
        }

        function editAge(){
            age.value += 1
        }

        function showTel(){
            alert(tel)
        }

</script>

<style>

.person{
    background-color: skyblue;
    box-shadow: 0 0 10px;
    border-radius: 10px;
    padding: 20px;
}
button{
    margin: 0 10px;
}

</style>