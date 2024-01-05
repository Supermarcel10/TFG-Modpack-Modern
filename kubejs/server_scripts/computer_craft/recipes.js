// priority: 0

const registerComputerCraftRecipes = (event) => {
    
    // Удаление рецептов мода
  event.remove({ not: [
        { id: 'computercraft:printed_pages' },
        { id: 'computercraft:printed_book' },
    ], mod: 'computercraft' });

    //networking cable
    event.recipes.gtceu.assembler('computercraft:cable')
        .itemInputs('ae2:fluix_glass_cable')
        .inputFluids(Fluid.of('gtceu:redstone', 288))
        .itemOutputs('computercraft:cable')
        .duration(80)
        .EUt(120)
    
    //wireless_modem_normal
    event.shaped('computercraft:wireless_modem_normal', [
        ' A ',
        'BCB',
        ' D '
    ], {
        A: 'gtceu:hv_sensor',
        B: 'ae2:calculation_processor',
        C: '#forge:circuits/hv',
        D: 'computercraft:cable',
    }).id('tfg:crafting/wireless_modem_normal')

    //wireless_modem_advanced
    event.shaped('computercraft:wireless_modem_advanced', [
        ' A ',
        'BCB',
        ' D '
    ], {
        A: 'ae2:wireless_receiver',
        B: 'ae2:calculation_processor',
        C: '#forge:circuits/hv',
        D: 'computercraft:cable',
    }).id('tfg:crafting/wireless_modem_advanced')

    //monitor_normal
    event.shaped('computercraft:monitor_normal', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:wires/single/magnesium_diboride',
        B: 'gtceu:computer_monitor_cover',
        C: 'ae2:calculation_processor',
        D: 'gtceu:mv_machine_casing',
        E: 'computercraft:cable',
        F: '#forge:circuits/mv',
    }).id('tfg:crafting/monitor_normal')

    //monitor_advanced
    event.shaped('computercraft:monitor_advanced', [
        'ABA',
        'CDC',
        'EFE'
    ], {
        A: '#forge:wires/single/mercury_barium_calcium_cuprate',
        B: 'gtceu:computer_monitor_cover',
        C: 'ae2:calculation_processor',
        D: 'gtceu:hv_machine_casing',
        E: 'computercraft:cable',
        F: '#forge:circuits/hv',
    }).id('tfg:crafting/monitor_advanced')

    //disk_drive
    event.shaped('computercraft:disk_drive', [
        'ABA',
        'CDC',
        'AEA'
    ], {
        A: 'computercraft:cable',
        B: 'ae2:drive',
        C: '#forge:circuits/hv',
        D: 'gtceu:hv_machine_casing',
        E: 'gtceu:hv_sensor',
    }).id('tfg:crafting/disk_drive')

    //speaker
    event.shaped('computercraft:speaker', [
        ' A ',
        'BCB',
        ' D '
    ], {
        A: 'minecraft:note_block',
        B: 'computercraft:cable',
        C: 'gtceu:mv_machine_casing',
        D: '#forge:circuits/mv',
    }).id('tfg:crafting/speaker')

    //printer
    event.shaped('computercraft:printer', [
        'ABC',
        'DED',
        'FBF'
    ], {
        A: 'gtceu:mv_electric_motor',
        B: '#forge:circuits/mv',
        C: 'gtceu:mv_robot_arm',
        D: 'computercraft:cable',
        E: 'gtceu:mv_machine_casing',
        F: 'gtceu:mv_conveyor_module'
    }).id('tfg:crafting/printer')

    //wired_modem
    event.shaped('computercraft:wired_modem', [
        ' A ',
        'BCB',
        'BDB'
    ], {
        A: 'gtceu:mv_sensor',
        B: 'computercraft:cable',
        C: '#forge:circuits/mv',
        D: 'ae2:calculation_processor',
    }).id('tfg:crafting/wired_modem')

    event.shapeless('computercraft:wired_modem', ['computercraft:wired_modem_full'])
        .id('tfg:crafting/wired_modem_shapeless')

    event.shapeless('computercraft:wired_modem_full', ['computercraft:wired_modem'])
        .id('tfg:crafting/wired_modem_full_shapeless')

    //computer_normal
    event.shaped('computercraft:computer_normal', [
        'AB ',
        'CD ',
        'EAE'
    ], {
        A: '#forge:wires/single/magnesium_diboride',
        B: 'gtceu:computer_monitor_cover',
        C: '#forge:batteries/mv',
        D: 'gtceu:mv_machine_casing',
        E: '#forge:circuits/hv'
    }).id('tfg:crafting/computer_normal')

    //computer_advanced
    event.shaped('computercraft:computer_advanced', [
        'AB ',
        'CD ',
        'EAE'
    ], {
        A: '#forge:wires/single/mercury_barium_calcium_cuprate',
        B: 'gtceu:computer_monitor_cover',
        C: '#forge:batteries/hv',
        D: 'gtceu:hv_machine_casing',
        E: '#forge:circuits/ev'
    }).id('tfg:crafting/computer_advanced')

    //turtle_normal
    event.shaped('computercraft:turtle_normal', [
        'ABC',
        'DFD',
        'EGH'
    ], {
        A: 'gtceu:hv_conveyor_module',
        B: 'gtceu:hv_emitter',
        C: 'gtceu:hv_sensor',
        D: 'gtceu:hv_robot_arm',
        E: '#forge:circuits/ev',
        F: 'computercraft:computer_normal',
        G: 'gtceu:steel_crate',
        H: 'gtceu:hv_electric_piston',
    }).id('tfg:crafting/turtle_normal')

    //turtle_advanced
    event.shaped('computercraft:turtle_advanced', [
        'ABC',
        'DFD',
        'EGH'
    ], {
        A: 'gtceu:ev_conveyor_module',
        B: 'gtceu:ev_emitter',
        C: 'gtceu:ev_sensor',
        D: 'gtceu:ev_robot_arm',
        E: '#forge:circuits/iv',
        F: 'computercraft:computer_advanced',
        G: 'gtceu:aluminium_crate',
        H: 'gtceu:ev_electric_piston',
    }).id('tfg:crafting/turtle_advanced')

    //disks crafts
    for (let i = 0; i < 16; i++) {
        event.recipes.gtceu.chemical_bath('computercraft:disk' + `${global.MINECRAFT_DYE_NAMES[i]}`)
            .itemInputs('ae2:blank_pattern')
            .inputFluids(Fluid.of(`gtceu:${global.MINECRAFT_DYE_NAMES[i]}_dye`, 288))
            .itemOutputs(Item.of('computercraft:disk', global.COMPUTER_CRAFT_DISCS[i]))
            .duration(20)
            .EUt(7)
    }

    

}