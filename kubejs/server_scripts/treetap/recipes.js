// priority: 0

const registerTreeTapRecipes = (e) => {
    
    //#region Treetap
    e.remove({ id: 'treetap:tap' })

    e.recipes.tfc.anvil('treetap:tap', '#forge:ingots/copper', [ 'draw_not_last', 'hit_not_last', 'shrink_last' ])
        .id('tfg:anvil/treetap')

    e.recipes.gtceu.assembler(`tfg:treetap`)
        .itemInputs('#forge:ingots/copper')
        .circuit(12)
        .itemOutputs('treetap:tap')
        .EUt(GTValues.VA[GTValues.ULV]).duration(100)

    //#endregion

    //#region Декрафт Treetap
    e.recipes.tfc.heating('treetap:tap', 1080)
        .resultFluid(Fluid.of('gtceu:copper', 144))
        .id('tfg:heating/treetap')
    //#endregion    

    //#region Рецепты Treetap
    e.custom({
        type: "treetap:tap_extract",
        log: {
            "item": "tfc:wood/log/kapok"
        },
        processing_time: 9600,
        metal_result: {
            item: "tfg:latex_bucket"
        },
        wooden_result: {
            item: "tfc:wooden_bucket",
            nbt: "{fluid: {FluidName: \"tfg:latex\", Amount: 1000}}"
        },
        life_cycle: [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0],
        collect_bucket: true,
        fluid_color: "#FBB982",
        conditions: [
            {
                type: "forge:mod_loaded",
                modid: "tfc"
            }
        ]
    }).id('tfg:treetap/latex')
    //#endregion
}