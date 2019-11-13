<template>
    <div>
        <v-data-table :headers="headers" :items="drink" sort-by="calories" class="elevation-1" :search="search">
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>Crud Atma pedia</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">buat minuman</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.name" label="Drink name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">

                                                <v-overflow-btn
                                                class="my-2"
                                                :items="dropdown_font"
                                                v-model="editedItem.calories"
                                                label="Calories"
                                                target="#dropdown-example"
                                                ></v-overflow-btn>
                                               
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.protein" label="Protein (g)">
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.action="{ item }">
                <v-icon @click="edititem(item)" class="mr-1">mdi-silverware</v-icon>
                <v-icon @click="deleteitem(item)" class="mr-1">mdi-delete</v-icon>
            </template>
        </v-data-table>
    </div>
</template>
<script>

import { drinkRef } from '../firebase';

export default {
    data: () => ({
        dropdown_font: ['Panas', 'Dingin'],
        cek : -1,
        search: '',
        dialog: false,
        headers: [{
                text: 'Minuman (100g serving)',
                align: 'left',
                sortable: false,
                value: 'name',
            },
            {
                text: 'Calories (g)',
                value: 'calories'

            },
            {
                text: 'Fat (g)',
                value: 'fat'
            },
            {
                text: 'Carbs (g)',
                value: 'carbs'
            },
            {
                text: 'Protein (g)',
                value: 'protein'
            },
            {
                text: 'Actions',
                value: 'action',
                sortable: false
            },
        ],
        drink: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
    }),
    firebase: {
        drink : drinkRef
    },
    computed: {
        formTitle() {
            return this.cek === -1 ? 'New Item' : 'Edit Item'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
    },
    methods: {
        close() {
            this.dialog = false
        },
        // methods untuk save
        save() { if (this.cek > -1) { drinkRef.child(this.editedIndex).set({name: this.editedItem.name,calories: this.editedItem.calories , fat : this.editedItem.fat, carbs: this.editedItem.carbs, protein: this.editedItem.protein}) 
        this.clear() } else { drinkRef.push({name: this.editedItem.name,calories: this.editedItem.calories , fat : this.editedItem.fat, carbs: this.editedItem.carbs, protein: this.editedItem.protein}) 
        this.clear() } this.close() },
        clear(){
            this.editedItem={}
            this.editedItem.name= ''
            this.editedItem.calories= 0
            this.editedItem.fat= 0
            this.editedItem.carbs= 0
            this.editedItem.protein= 0
            this.cek=-1
        },
        edititem(item) {
            this.editedIndex = item['.key']
            this.cek = 0
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },
        deleteitem(item) {
            confirm('Are you sure you want to delete this item?') && drinkRef.child((item['.key'])).remove()
        }
    },
}
</script>