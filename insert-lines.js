const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'src/components/admin/PageBuilder.tsx');
let lines = fs.readFileSync(targetPath, 'utf8').split('\n');

const newUIs = `
                     {block.type === 'HOMEPAGE_HERO_BLOCK' && (
                        <div className="space-y-4">
                           <p className="text-xs text-gray-500 bg-gray-50 p-4 rounded border border-gray-200">
                             This block represents the interactive Sketchbook Hero animation. No editable content is required.
                           </p>
                        </div>
                     )}
                     {block.type === 'WELCOME_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.logoText} onChange={e => updateBlockData(block.id, { logoText: e.target.value })} className="admin-input w-24" placeholder="Logo Text (FM)" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input flex-1" placeholder="Title" />
                           </div>
                           <textarea value={block.data.quote} onChange={e => updateBlockData(block.id, { quote: e.target.value })} className="admin-input h-24" placeholder="Quote Content" />
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.author} onChange={e => updateBlockData(block.id, { author: e.target.value })} className="admin-input" placeholder="Author Name" />
                              <input type="text" value={block.data.role} onChange={e => updateBlockData(block.id, { role: e.target.value })} className="admin-input" placeholder="Author Role" />
                           </div>
                        </div>
                     )}
                     {block.type === 'STATS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.stats?.map((stat: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={stat.num} onChange={e => { const newS = [...block.data.stats]; newS[i].num = e.target.value; updateBlockData(block.id, { stats: newS }); }} className="admin-input text-xs w-20" placeholder="Number" />
                                       <button onClick={() => updateBlockData(block.id, { stats: block.data.stats.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2 ml-auto">✕</button>
                                    </div>
                                    <input type="text" value={stat.label} onChange={e => { const newS = [...block.data.stats]; newS[i].label = e.target.value; updateBlockData(block.id, { stats: newS }); }} className="admin-input text-xs" placeholder="Label" />
                                    <input type="text" value={stat.note} onChange={e => { const newS = [...block.data.stats]; newS[i].note = e.target.value; updateBlockData(block.id, { stats: newS }); }} className="admin-input text-xs" placeholder="Note" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { stats: [...(block.data.stats || []), { num: "100", label: "New Stat", note: "Note" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Stat</button>
                        </div>
                     )}
                     {block.type === 'WHY_CHOOSE_US_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.pillars?.map((p: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-3 rounded space-y-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={p.icon} onChange={e => { const newP = [...block.data.pillars]; newP[i].icon = e.target.value; updateBlockData(block.id, { pillars: newP }); }} className="admin-input text-xs w-20" placeholder="Icon" />
                                       <input type="text" value={p.title} onChange={e => { const newP = [...block.data.pillars]; newP[i].title = e.target.value; updateBlockData(block.id, { pillars: newP }); }} className="admin-input text-xs flex-1" placeholder="Title" />
                                       <button onClick={() => updateBlockData(block.id, { pillars: block.data.pillars.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                    </div>
                                    <textarea value={p.desc} onChange={e => { const newP = [...block.data.pillars]; newP[i].desc = e.target.value; updateBlockData(block.id, { pillars: newP }); }} className="admin-input text-xs h-16" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { pillars: [...(block.data.pillars || []), { icon: "Star", title: "New Pillar", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Pillar</button>
                        </div>
                     )}
                     {block.type === 'PHILOSOPHY_SECTION_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2 border border-gray-200 p-3 rounded bg-gray-50">
                                 <p className="text-xs font-semibold">List Items</p>
                                 {block.data.items?.map((item: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                       <input type="text" value={item} onChange={e => { const newI = [...block.data.items]; newI[i] = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs flex-1" placeholder="Item" />
                                       <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                 ))}
                                 <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), "New Item"] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Item</button>
                              </div>
                              <div className="space-y-2">
                                 <ImageUploader value={block.data.imageUrl} onChange={url => updateBlockData(block.id, { imageUrl: url })} />
                                 <input type="text" value={block.data.imageCaption} onChange={e => updateBlockData(block.id, { imageCaption: e.target.value })} className="admin-input text-xs" placeholder="Image Caption" />
                              </div>
                           </div>
                        </div>
                     )}
                     {block.type === 'ACADEMIC_EXCELLENCE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2">
                              {block.data.programs?.map((p: any, i: number) => (
                                 <div key={i} className="flex gap-2 items-start border border-gray-200 p-2 rounded">
                                    <div className="flex-1 space-y-2">
                                       <div className="flex gap-2">
                                          <input type="text" value={p.title} onChange={e => { const newP = [...block.data.programs]; newP[i].title = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs" placeholder="Program Title" />
                                          <input type="text" value={p.age} onChange={e => { const newP = [...block.data.programs]; newP[i].age = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Age Group" />
                                          <input type="text" value={p.href} onChange={e => { const newP = [...block.data.programs]; newP[i].href = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Link (Optional)" />
                                       </div>
                                       <textarea value={p.desc} onChange={e => { const newP = [...block.data.programs]; newP[i].desc = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                    </div>
                                    <button onClick={() => updateBlockData(block.id, { programs: block.data.programs.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 p-2 mt-1">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { programs: [...(block.data.programs || []), { title: "New Program", age: "Age X-Y", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05] mt-2">+ Add Program</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'STUDENT_JOURNEY_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.stages?.map((s: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex gap-2">
                                    <input type="text" value={s.year} onChange={e => { const newS = [...block.data.stages]; newS[i].year = e.target.value; updateBlockData(block.id, { stages: newS }); }} className="admin-input text-xs w-20" placeholder="Year/Age" />
                                    <input type="text" value={s.label} onChange={e => { const newS = [...block.data.stages]; newS[i].label = e.target.value; updateBlockData(block.id, { stages: newS }); }} className="admin-input text-xs flex-1" placeholder="Label" />
                                    <input type="text" value={s.icon} onChange={e => { const newS = [...block.data.stages]; newS[i].icon = e.target.value; updateBlockData(block.id, { stages: newS }); }} className="admin-input text-xs w-16" placeholder="Icon" />
                                    <button onClick={() => updateBlockData(block.id, { stages: block.data.stages.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { stages: [...(block.data.stages || []), { year: "Age X", label: "New Stage", icon: "Star" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Stage</button>
                        </div>
                     )}
                     {block.type === 'CAMPUS_EXPERIENCE_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-4">
                                 <div>
                                    <label className="block text-xs mb-1 font-semibold">Image 1</label>
                                    <ImageUploader value={block.data.image1} onChange={url => updateBlockData(block.id, { image1: url })} />
                                 </div>
                                 <div>
                                    <label className="block text-xs mb-1 font-semibold">Image 2</label>
                                    <ImageUploader value={block.data.image2} onChange={url => updateBlockData(block.id, { image2: url })} />
                                 </div>
                              </div>
                              <div className="space-y-2 border border-gray-200 p-3 rounded bg-gray-50">
                                 <p className="text-xs font-semibold">Features</p>
                                 {block.data.features?.map((f: string, i: number) => (
                                    <div key={i} className="flex gap-2">
                                       <input type="text" value={f} onChange={e => { const newF = [...block.data.features]; newF[i] = e.target.value; updateBlockData(block.id, { features: newF }); }} className="admin-input text-xs flex-1" placeholder="Feature" />
                                       <button onClick={() => updateBlockData(block.id, { features: block.data.features.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                 ))}
                                 <button onClick={() => updateBlockData(block.id, { features: [...(block.data.features || []), "New Feature"] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Feature</button>
                              </div>
                           </div>
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.ctaText} onChange={e => updateBlockData(block.id, { ctaText: e.target.value })} className="admin-input" placeholder="CTA Button Text" />
                              <input type="text" value={block.data.ctaLink} onChange={e => updateBlockData(block.id, { ctaLink: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                        </div>
                     )}
                     {block.type === 'FACILITIES_OVERVIEW_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.facilities?.map((f: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={f.icon} onChange={e => { const newF = [...block.data.facilities]; newF[i].icon = e.target.value; updateBlockData(block.id, { facilities: newF }); }} className="admin-input text-xs w-16" placeholder="Icon" />
                                       <input type="text" value={f.label} onChange={e => { const newF = [...block.data.facilities]; newF[i].label = e.target.value; updateBlockData(block.id, { facilities: newF }); }} className="admin-input text-xs flex-1" placeholder="Label" />
                                       <button onClick={() => updateBlockData(block.id, { facilities: block.data.facilities.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                    </div>
                                    <input type="text" value={f.sub} onChange={e => { const newF = [...block.data.facilities]; newF[i].sub = e.target.value; updateBlockData(block.id, { facilities: newF }); }} className="admin-input text-xs" placeholder="Sub-label (e.g. Physics)" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { facilities: [...(block.data.facilities || []), { icon: "Star", label: "New Facility", sub: "Details" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Facility</button>
                           <div className="grid grid-cols-2 gap-4 pt-2">
                              <input type="text" value={block.data.ctaText} onChange={e => updateBlockData(block.id, { ctaText: e.target.value })} className="admin-input" placeholder="CTA Button Text" />
                              <input type="text" value={block.data.ctaLink} onChange={e => updateBlockData(block.id, { ctaLink: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                        </div>
                     )}
                     {block.type === 'FEATURED_PROGRAMS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                              <input type="text" value={block.data.subtitle} onChange={e => updateBlockData(block.id, { subtitle: e.target.value })} className="admin-input" placeholder="Subtitle" />
                           </div>
                           <div className="space-y-2">
                              {block.data.programs?.map((p: any, i: number) => (
                                 <div key={i} className="flex gap-2 items-start border border-gray-200 p-2 rounded">
                                    <div className="flex-1 space-y-2">
                                       <div className="flex gap-2">
                                          <input type="text" value={p.title} onChange={e => { const newP = [...block.data.programs]; newP[i].title = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs" placeholder="Program Title" />
                                          <input type="text" value={p.tag} onChange={e => { const newP = [...block.data.programs]; newP[i].tag = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Tag" />
                                          <input type="text" value={p.href} onChange={e => { const newP = [...block.data.programs]; newP[i].href = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs w-32" placeholder="Link (Optional)" />
                                       </div>
                                       <textarea value={p.desc} onChange={e => { const newP = [...block.data.programs]; newP[i].desc = e.target.value; updateBlockData(block.id, { programs: newP }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                    </div>
                                    <button onClick={() => updateBlockData(block.id, { programs: block.data.programs.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 p-2 mt-1">✕</button>
                                 </div>
                              ))}
                              <button onClick={() => updateBlockData(block.id, { programs: [...(block.data.programs || []), { title: "New Program", tag: "Tag", desc: "Desc" }] })} className="text-xs font-semibold text-[#FB7F05] mt-2">+ Add Program</button>
                           </div>
                        </div>
                     )}
                     {block.type === 'ACHIEVEMENTS_TICKER_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-3">
                              {block.data.items?.map((item: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex gap-2">
                                    <input type="text" value={item.icon} onChange={e => { const newI = [...block.data.items]; newI[i].icon = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs w-20" placeholder="Icon" />
                                    <input type="text" value={item.text} onChange={e => { const newI = [...block.data.items]; newI[i].text = e.target.value; updateBlockData(block.id, { items: newI }); }} className="admin-input text-xs flex-1" placeholder="Achievement Text" />
                                    <button onClick={() => updateBlockData(block.id, { items: block.data.items.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-1">✕</button>
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { items: [...(block.data.items || []), { icon: "Star", text: "New Achievement" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Achievement</button>
                        </div>
                     )}
                     {block.type === 'UPCOMING_EVENTS_BLOCK' && (
                        <div className="space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                              <input type="text" value={block.data.title} onChange={e => updateBlockData(block.id, { title: e.target.value })} className="admin-input" placeholder="Title" />
                           </div>
                           <div className="space-y-2">
                              {block.data.events?.map((ev: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={ev.date} onChange={e => { const newE = [...block.data.events]; newE[i].date = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs w-24" placeholder="Date (Aug 15)" />
                                       <input type="text" value={ev.title} onChange={e => { const newE = [...block.data.events]; newE[i].title = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs flex-1" placeholder="Event Title" />
                                       <input type="text" value={ev.type} onChange={e => { const newE = [...block.data.events]; newE[i].type = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs w-32" placeholder="Type" />
                                       <button onClick={() => updateBlockData(block.id, { events: block.data.events.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                    <textarea value={ev.desc} onChange={e => { const newE = [...block.data.events]; newE[i].desc = e.target.value; updateBlockData(block.id, { events: newE }); }} className="admin-input text-xs h-12" placeholder="Description" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { events: [...(block.data.events || []), { date: "Jan 1", title: "New Event", type: "Event", desc: "" }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Event</button>
                           <div className="grid grid-cols-2 gap-4 pt-2">
                              <input type="text" value={block.data.ctaText} onChange={e => updateBlockData(block.id, { ctaText: e.target.value })} className="admin-input" placeholder="CTA Button Text" />
                              <input type="text" value={block.data.ctaLink} onChange={e => updateBlockData(block.id, { ctaLink: e.target.value })} className="admin-input" placeholder="CTA Button Link" />
                           </div>
                        </div>
                     )}
                     {block.type === 'TESTIMONIALS_BLOCK' && (
                        <div className="space-y-4">
                           <input type="text" value={block.data.annotation} onChange={e => updateBlockData(block.id, { annotation: e.target.value })} className="admin-input" placeholder="Annotation" />
                           <div className="space-y-2">
                              {block.data.testimonials?.map((t: any, i: number) => (
                                 <div key={i} className="border border-gray-200 p-2 rounded flex flex-col gap-2">
                                    <div className="flex gap-2">
                                       <input type="text" value={t.name} onChange={e => { const newT = [...block.data.testimonials]; newT[i].name = e.target.value; updateBlockData(block.id, { testimonials: newT }); }} className="admin-input text-xs flex-1" placeholder="Parent Name" />
                                       <input type="text" value={t.child} onChange={e => { const newT = [...block.data.testimonials]; newT[i].child = e.target.value; updateBlockData(block.id, { testimonials: newT }); }} className="admin-input text-xs flex-1" placeholder="Child details" />
                                       <button onClick={() => updateBlockData(block.id, { testimonials: block.data.testimonials.filter((_: any, idx: number) => idx !== i) })} className="text-red-400 px-2">✕</button>
                                    </div>
                                    <textarea value={t.quote} onChange={e => { const newT = [...block.data.testimonials]; newT[i].quote = e.target.value; updateBlockData(block.id, { testimonials: newT }); }} className="admin-input text-xs h-16" placeholder="Quote" />
                                 </div>
                              ))}
                           </div>
                           <button onClick={() => updateBlockData(block.id, { testimonials: [...(block.data.testimonials || []), { name: "Name", child: "Child Info", quote: "Review..." }] })} className="text-xs font-semibold text-[#FB7F05]">+ Add Testimonial</button>
                        </div>
                     )}
                     {block.type === 'CUSTOM_HTML_BLOCK' && (
                        <div className="space-y-4">
                           <textarea value={block.data.html} onChange={e => updateBlockData(block.id, { html: e.target.value })} className="admin-input font-mono text-sm h-64" placeholder="<div class='custom-styles'>\n  <p>Your raw HTML goes here...</p>\n</div>" />
                        </div>
                     )}
`;

lines.splice(586, 0, newUIs);
fs.writeFileSync(targetPath, lines.join('\n'));
console.log('Successfully injected into lines!');
