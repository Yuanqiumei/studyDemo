<template>
    <div>
        <group>
            <cell is-link title="Demo" link="/Demo"></cell>
            <cell is-link title="Filter Show" link="/Filter"></cell>
            <cell is-link title="Buy car" link="/Car"></cell>
        </group>
    </div>
</template>


<script>


import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
    name: 'Home',
    components: {
        Tabbar,
        TabbarItem,
        Group,
        Cell
    },
    data() {
        return{

        }
    }
}
</script>

<style>

</style>


