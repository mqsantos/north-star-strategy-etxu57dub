migrate(
  (app) => {
    // 1. Seed User
    const usersCol = app.findCollectionByNameOrId('_pb_users_auth_')
    let adminUser
    try {
      adminUser = app.findAuthRecordByEmail('_pb_users_auth_', 'mqsantos@gmail.com')
    } catch (_) {
      adminUser = new Record(usersCol)
      adminUser.setEmail('mqsantos@gmail.com')
      adminUser.setPassword('Skip@Pass')
      adminUser.setVerified(true)
      adminUser.set('name', 'Marcus L.')
      app.save(adminUser)
    }

    let user2
    try {
      user2 = app.findAuthRecordByEmail('_pb_users_auth_', 'erika@example.com')
    } catch (_) {
      user2 = new Record(usersCol)
      user2.setEmail('erika@example.com')
      user2.setPassword('Skip@Pass')
      user2.setVerified(true)
      user2.set('name', 'Erika S.')
      app.save(user2)
    }

    // 2. Seed Objectives
    const objCol = app.findCollectionByNameOrId('objectives')

    let obj1
    try {
      obj1 = app.findFirstRecordByData('objectives', 'title', 'Carbon Neutral Ecosystem')
    } catch (_) {
      obj1 = new Record(objCol)
      obj1.set('title', 'Carbon Neutral Ecosystem')
      obj1.set('description', 'Transitioning all tier-one suppliers to 100% renewable energy.')
      obj1.set('type', 'breakthrough')
      obj1.set('horizon', 'H1 2024-2027')
      obj1.set('status', 'on_track')
      obj1.set('progress', 75)
      app.save(obj1)
    }

    let obj2
    try {
      obj2 = app.findFirstRecordByData('objectives', 'title', 'Unified Strategic Core')
    } catch (_) {
      obj2 = new Record(objCol)
      obj2.set('title', 'Unified Strategic Core')
      obj2.set(
        'description',
        'Migrating all 42 business units to a single real-time execution engine.',
      )
      obj2.set('type', 'breakthrough')
      obj2.set('horizon', 'COMPLETION PHASE')
      obj2.set('status', 'completed')
      obj2.set('progress', 94)
      app.save(obj2)
    }

    let obj3
    try {
      obj3 = app.findFirstRecordByData('objectives', 'title', 'Direct-to-Value Stream')
    } catch (_) {
      obj3 = new Record(objCol)
      obj3.set('title', 'Direct-to-Value Stream')
      obj3.set(
        'description',
        'Eliminating all non-value-adding intermediary steps in the supply chain.',
      )
      obj3.set('type', 'breakthrough')
      obj3.set('horizon', 'MID-POINT')
      obj3.set('status', 'at_risk')
      obj3.set('progress', 50)
      app.save(obj3)
    }

    // 3. Seed KPIs
    const kpiCol = app.findCollectionByNameOrId('kpis')

    let kpi1
    try {
      kpi1 = app.findFirstRecordByData('kpis', 'name', 'Market Penetration Index')
    } catch (_) {
      kpi1 = new Record(kpiCol)
      kpi1.set('name', 'Market Penetration Index')
      kpi1.set('current_value', 84.2)
      kpi1.set('target_value', 90)
      kpi1.set('unit', '%')
      kpi1.set('objective_id', obj3.id)
      app.save(kpi1)
    }

    let kpi2
    try {
      kpi2 = app.findFirstRecordByData('kpis', 'name', 'Net Margin')
    } catch (_) {
      kpi2 = new Record(kpiCol)
      kpi2.set('name', 'Net Margin')
      kpi2.set('current_value', 92)
      kpi2.set('target_value', 95)
      kpi2.set('unit', '%')
      kpi2.set('parent_kpi', kpi1.id)
      app.save(kpi2)
    }

    // 4. Seed Projects
    const projCol = app.findCollectionByNameOrId('projects')

    let proj1
    try {
      proj1 = app.findFirstRecordByData('projects', 'title', 'Project Alpha')
    } catch (_) {
      proj1 = new Record(projCol)
      proj1.set('title', 'Project Alpha')
      proj1.set('status', 'active')
      proj1.set('objective_id', obj1.id)
      app.save(proj1)
    }

    let proj2
    try {
      proj2 = app.findFirstRecordByData('projects', 'title', 'Operations Waste Reduction')
    } catch (_) {
      proj2 = new Record(projCol)
      proj2.set('title', 'Operations Waste Reduction')
      proj2.set('status', 'active')
      proj2.set('objective_id', obj3.id)
      app.save(proj2)
    }

    // 5. Seed Tasks
    const taskCol = app.findCollectionByNameOrId('pdca_tasks')

    let task1
    try {
      task1 = app.findFirstRecordByData('pdca_tasks', 'title', 'Check: Sales Pipeline Velocity')
    } catch (_) {
      task1 = new Record(taskCol)
      task1.set('title', 'Check: Sales Pipeline Velocity')
      task1.set('stage', 'check')
      task1.set('priority', 'medium')
      task1.set('project_id', proj1.id)
      task1.set('owner_id', adminUser.id)
      app.save(task1)
    }

    let task2
    try {
      task2 = app.findFirstRecordByData('pdca_tasks', 'title', 'Act: Adjust Lean Standards')
    } catch (_) {
      task2 = new Record(taskCol)
      task2.set('title', 'Act: Adjust Lean Standards')
      task2.set('stage', 'act')
      task2.set('priority', 'medium')
      task2.set('project_id', proj2.id)
      task2.set('owner_id', user2.id)
      app.save(task2)
    }

    let task3
    try {
      task3 = app.findFirstRecordByData('pdca_tasks', 'title', 'Plan: Engagement Survey')
    } catch (_) {
      task3 = new Record(taskCol)
      task3.set('title', 'Plan: Engagement Survey')
      task3.set('stage', 'plan')
      task3.set('priority', 'high')
      task3.set('project_id', proj1.id)
      task3.set('owner_id', adminUser.id)
      app.save(task3)
    }

    // 6. Seed Activities
    const actCol = app.findCollectionByNameOrId('activities')
    try {
      app.findFirstRecordByData(
        'activities',
        'content',
        'approved the X-Matrix for the Customer Experience pillar.',
      )
    } catch (_) {
      const act1 = new Record(actCol)
      act1.set('user_id', user2.id)
      act1.set('content', 'approved the X-Matrix for the Customer Experience pillar.')
      act1.set('type', 'approval')
      app.save(act1)

      const act2 = new Record(actCol)
      act2.set('user_id', adminUser.id)
      act2.set('content', 'updated the KPI EBITDA Margin to 14.8%.')
      act2.set('type', 'update')
      app.save(act2)
    }
  },
  (app) => {
    // Truncate in reverse order
    const collections = ['activities', 'pdca_tasks', 'projects', 'kpis', 'objectives']
    for (const name of collections) {
      try {
        app.truncateCollection(app.findCollectionByNameOrId(name))
      } catch (_) {}
    }
  },
)
