// priority: 0

const poorRawOrePrefix = TagPrefix.getPrefix(`poor_raw`)
const normalRawOrePrefix = TagPrefix.getPrefix(`raw`)
const richRawOrePrefix = TagPrefix.getPrefix(`rich_raw`)

const registerGTrecipes = (event) => {
    GTRegistries.MATERIALS.forEach(material => {
        if (material.hasProperty($PropertyKey.ORE) && !material.hasFlag(GTMaterialFlags.NO_UNIFICATION) && !ChemicalHelper.get(TagPrefix.ore, material, 1).isEmpty()) {
            event.remove({id: `gtceu:forge_hammer/hammer_raw_${material}_to_crushed_ore`})
            event.remove({id: `gtceu:macerator/macerate_raw_${material}_ore_to_crushed_ore`})

            if (doesMaterialUseNormalFurnace(material)) {
                event.remove({id: `gtceu:smelting/smelt_raw_${material}_ore_to_ingot`})
                event.remove({id: `gtceu:blasting/smelt_raw_${material}_ore_to_ingot`})
            }

            generateRecipesForRawOres(event, material)

            global.allTFCStoneTypeNames.forEach(stoneTypeName => {
                generateRecipesForOres(event, stoneTypeName, material)
            })
        }
    })
}

const doesMaterialUseNormalFurnace = (material) => {
    return !material.hasProperty($PropertyKey.BLAST);
}

const generateRecipesForRawOres = (event, material) => {
    const materialOreProperty = material.getProperty($PropertyKey.ORE)
    const crushedStack = ChemicalHelper.get(TagPrefix.crushed, material, 1);
    
    let ingotStack;
    const smeltingMaterial = materialOreProperty.getDirectSmeltResult() == null ? material : materialOreProperty.getDirectSmeltResult();
    const amountOfCrushedOre = materialOreProperty.getOreMultiplier();
    
    if (smeltingMaterial.hasProperty($PropertyKey.INGOT)) {
        ingotStack = ChemicalHelper.get(TagPrefix.ingot, smeltingMaterial, 1);
    } else if (smeltingMaterial.hasProperty($PropertyKey.GEM)) {
        ingotStack = ChemicalHelper.get(TagPrefix.gem, smeltingMaterial, 1);
    } else {
        ingotStack = ChemicalHelper.get(TagPrefix.dust, smeltingMaterial, 1);
    }

    ingotStack.setCount(ingotStack.getCount() * materialOreProperty.getOreMultiplier());
    crushedStack.setCount(crushedStack.getCount() * materialOreProperty.getOreMultiplier());

    if (crushedStack.isEmpty()) return;

    const generateRecipes = (tagPrefix, multiplier) => {
        let outputItems;
    
        if (material.hasProperty($PropertyKey.GEM) && !TagPrefix.gem.isIgnored(material)) {
            outputItems = `${amountOfCrushedOre * multiplier}x #forge:gems/${material}`
        } else {
            outputItems = `${amountOfCrushedOre * multiplier}x #forge:crushed_ores/${material}`
        }
    
        const crushedOreAmountWithMultiplier = crushedStack.getCount() * multiplier

        const forgeHammerRecipeName = `hammer_${tagPrefix.name}_${material}_to_crushed_ore`
        const maceratorRecipeName = `macerate_${tagPrefix.name}_${material}_to_crushed_ore`
    
        const rawStack = `1x #forge:${tagPrefix.name}_materials/${material}`
        const crushedStackMultiplied = `${crushedOreAmountWithMultiplier}x #forge:crushed_ores/${material}`
        
        event.recipes.gtceu.forge_hammer(forgeHammerRecipeName)
            .itemInputs(rawStack)
            .itemOutputs(outputItems)
            .duration(10).EUt(16);
        
        event.recipes.gtceu.macerator(maceratorRecipeName)
                .itemInputs(rawStack)
                .itemOutputs(crushedStackMultiplied)
                .chancedOutput(crushedStackMultiplied, 5000, 750)
                .chancedOutput(crushedStackMultiplied, 2500, 500)
                .chancedOutput(crushedStackMultiplied, 1250, 250)
                .duration(10).EUt(16);

        // do not try to add smelting recipes for materials which require blast furnace
        if (!ingotStack.isEmpty() && doesMaterialUseNormalFurnace(smeltingMaterial) && !tagPrefix.isIgnored(material)) {
            const xp = Math.round(((1 + materialOreProperty.getOreMultiplier() * 0.33) / 3) * 10) / 10;
        
            const smeltRecipeName = `tfg:smelting/smelt_${tagPrefix.name}_${material}_raw_to_ingot`
            const blastingRecipeName = `tfg:blasting/smelt_${tagPrefix.name}_${material}_raw_to_ingot`
            
            const trueOrePrefix = ChemicalHelper.getPrefix(ingotStack.getItem())
            const trueMaterial = ChemicalHelper.getUnificationEntry(ingotStack.getItem()).material

            const outputMaterial = `${ingotStack.getCount() * multiplier}x #${ChemicalHelper.getTag(trueOrePrefix, trueMaterial).location()}`

            event.smelting(outputMaterial, rawStack).id(smeltRecipeName).xp(xp)
            event.blasting(outputMaterial, rawStack).id(blastingRecipeName).xp(xp)
        }
    }

    generateRecipes(poorRawOrePrefix, 1)
    generateRecipes(normalRawOrePrefix, 2)
    generateRecipes(richRawOrePrefix, 3)
}

const generateRecipesForOres = (event, stoneTypeName, material) => {
    const materialOreProperty = material.getProperty($PropertyKey.ORE)
    let byproductMaterial = materialOreProperty.getOreByProducts()[0]
    if (byproductMaterial == null) byproductMaterial = material

    const stoneTypePrefix = TagPrefix.getPrefix(`tfc_${stoneTypeName}`)

    let ingotStack;
    let byproductStack = ChemicalHelper.get(TagPrefix.gem, byproductMaterial, 1);
    if (byproductStack.isEmpty()) byproductStack = ChemicalHelper.get(TagPrefix.dust, byproductMaterial, 1);
    
    const smeltingMaterial = materialOreProperty.getDirectSmeltResult() == null ? material : materialOreProperty.getDirectSmeltResult();
    const crushedStack = ChemicalHelper.get(TagPrefix.crushed, material, 1);

    if (smeltingMaterial.hasProperty($PropertyKey.INGOT)) {
        ingotStack = ChemicalHelper.get(TagPrefix.ingot, smeltingMaterial, 1);
    } else if (smeltingMaterial.hasProperty($PropertyKey.GEM)) {
        ingotStack = ChemicalHelper.get(TagPrefix.gem, smeltingMaterial, 1);
    } else {
        ingotStack = ChemicalHelper.get(TagPrefix.dust, smeltingMaterial, 1);
    }
    
    const oreStack = `1x #forge:ores/tfc_${stoneTypeName}/${material}`

    if (!crushedStack.isEmpty()) {
        let outputItems;
    
        if (material.hasProperty($PropertyKey.GEM) && !TagPrefix.gem.isIgnored(material)) {
            outputItems = `1x #forge:gems/${material}`
        } else {
            outputItems = `1x #forge:crushed_ores/${material}`
        }

        const forgeHammerRecipeName = `hammer_${stoneTypeName}_${material}_ore_to_raw_ore`
        const maceratorRecipeName = `macerate_${stoneTypeName}_${material}_ore_to_raw_ore`
        
        const crushedStack = `2x #forge:crushed_ores/${material}`
        const stoneTypeDustStack = `1x #forge:dusts/${stoneTypeName}`
        
        event.recipes.gtceu.forge_hammer(forgeHammerRecipeName)
            .itemInputs(oreStack)
            .itemOutputs(outputItems)
            .duration(10).EUt(16);

        event.recipes.gtceu.macerator(maceratorRecipeName)
            .itemInputs(oreStack)
            .itemOutputs(crushedStack)
            .chancedOutput(byproductStack, 1400, 850)
            .chancedOutput(stoneTypeDustStack, 5000, 850)
            .duration(10).EUt(16);
    }

    // do not try to add smelting recipes for materials which require blast furnace
    if (!ingotStack.isEmpty() && doesMaterialUseNormalFurnace(smeltingMaterial) && !stoneTypePrefix.isIgnored(material)) {
        const xp = Math.round(((1 + materialOreProperty.getOreMultiplier() * 0.5) * 0.5 - 0.05) * 10) / 10
        
        const smeltRecipeName = `tfg:smelting/smelt_${stoneTypePrefix.name}_${material}_ore_to_ingot`
        const blastingRecipeName = `tfg:blasting/smelt_${stoneTypePrefix.name}_${material}_ore_to_ingot`
        
        const trueOrePrefix = ChemicalHelper.getPrefix(ingotStack.getItem())
        const trueMaterial = ChemicalHelper.getUnificationEntry(ingotStack.getItem()).material

        const outputMaterial = `1x #${ChemicalHelper.getTag(trueOrePrefix, trueMaterial).location()}`

        event.smelting(outputMaterial, oreStack).id(smeltRecipeName).xp(xp)
        event.blasting(outputMaterial, oreStack).id(blastingRecipeName).xp(xp)
    }
}