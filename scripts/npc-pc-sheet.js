class NPCasPCSheet extends game.pf2e.applications.actor.NPCSheetPF2e {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["pf2e", "sheet", "actor", "npc", "npc-as-pc"],
      template: "modules/pf2e-npc-as-pc-sheet/templates/npc-as-pc-sheet.html",
      width: 700,
      height: 800,
      tabs: [{ navSelector: ".sheet-navigation", contentSelector: ".sheet-content", initial: "main" }]
    });
  }

  getData() {
    const data = super.getData();
    
    // Add any additional data processing here
    // Organize skills by category like the PC sheet
    if (data.data?.skills) {
      data.skillsByCategory = this._organizeSkills(data.data.skills);
    }
    
    return data;
  }

  _organizeSkills(skills) {
    // Group skills similar to PC sheet
    const categories = {
      'Physical': ['acrobatics', 'athletics'],
      'Social': ['deception', 'diplomacy', 'intimidation', 'performance'],
      'Mental': ['arcana', 'crafting', 'lore', 'medicine', 'nature', 'occultism', 'religion', 'society', 'survival']
    };
    
    const organized = {};
    for (const [category, skillList] of Object.entries(categories)) {
      organized[category] = {};
      skillList.forEach(skillKey => {
        if (skills[skillKey]) {
          organized[category][skillKey] = skills[skillKey];
        }
      });
    }
    
    return organized;
  }

  activateListeners(html) {
    super.activateListeners(html);
    
    // Add any custom listeners here
    html.find('.item-create').click(this._onItemCreate.bind(this));
    html.find('.item-edit').click(this._onItemEdit.bind(this));
    html.find('.item-delete').click(this._onItemDelete.bind(this));
  }
}

// Register the sheet
Hooks.once('init', () => {
  Actors.registerSheet("pf2e", NPCasPCSheet, {
    types: ["npc"],
    makeDefault: false,
    label: "PF2e NPC as PC Sheet"
  });
  
  console.log("PF2e NPC as PC Sheet | Module initialized");
});
