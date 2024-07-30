<template>
    <div class="person">

      <h2>The car that you choiced is {{ car.model }} that brand is {{ car.name }} and made in {{ car.year }}</h2>
        <button @click="changeModel"> ChangeModel</button>

    <h2>BrandLists: </h2>
    <ul>
        <li v-for="b in brands" :key="b.id"> {{ b.bname }}</li>
    </ul>

    <button @click="changFirstBrand">Change the first brand</button>

    <hr>


    </div>

    
</template>



<script lang="ts" setup name="Person">
import { reactive } from 'vue';

let car = reactive({
    name:'BMW',
    model:'X5',
    year:2023
})

let brands = reactive([
    {id:'1', bname:'BMW'},
    {id:'2', bname:'Audi'},
    {id:'3', bname:'Mercedes'}
])

function changeModel(){
    car.model = 'X6'
}

function changFirstBrand(){
    brands[0].bname = 'XIAOMI'
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