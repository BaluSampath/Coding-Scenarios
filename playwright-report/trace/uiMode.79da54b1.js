import{r as L,a as p,j as T,F as ge,L as me,u as we,d as ve,_ as be,e as ke,f as _e,R as v,g as Se,S as Te,h as H,T as y,t as xe,E as Ee,s as le,m as Me,i as oe,W as ye,M as Ce,b as Re,c as Be}from"./assets/workbench-2b888248.js";const Ne=me;function Fe({rootItem:i,render:e,icon:t,isError:s,selectedItem:o,onAccepted:a,onSelected:n,onHighlighted:l,treeState:r,setTreeState:h,noItemsMessage:f,dataTestId:m,autoExpandDeep:g}){const d=L.useMemo(()=>{for(let c=o==null?void 0:o.parent;c;c=c.parent)r.expandedItems.set(c.id,!0);return De(i,r.expandedItems,g)},[i,o,r,g]);return p(Ne,{items:[...d.keys()],id:c=>c.id,dataTestId:m,render:c=>{const w=e(c);return T(ge,{children:[t&&p("div",{className:"codicon "+(t(c)||"blank"),style:{minWidth:16,marginRight:4}}),typeof w=="string"?p("div",{style:{textOverflow:"ellipsis",overflow:"hidden"},children:w}):w]})},icon:c=>{const w=d.get(c).expanded;if(typeof w=="boolean")return w?"codicon-chevron-down":"codicon-chevron-right"},isError:c=>(s==null?void 0:s(c))||!1,indent:c=>d.get(c).depth,selectedItem:o,onAccepted:c=>a==null?void 0:a(c),onSelected:c=>n==null?void 0:n(c),onHighlighted:c=>l==null?void 0:l(c),onLeftArrow:c=>{const{expanded:w,parent:b}=d.get(c);w?(r.expandedItems.set(c.id,!1),h({...r})):b&&(n==null||n(b))},onRightArrow:c=>{c.children.length&&(r.expandedItems.set(c.id,!0),h({...r}))},onIconClicked:c=>{const{expanded:w}=d.get(c);if(w){for(let b=o;b;b=b.parent)if(b===c){n==null||n(c);break}r.expandedItems.set(c.id,!1)}else r.expandedItems.set(c.id,!0);h({...r})},noItemsMessage:f})}function De(i,e,t){const s=new Map,o=(a,n)=>{for(const l of a.children){const r=e.get(l.id),h=(t||n===0)&&s.size<25&&r!==!1,f=l.children.length?r||h:void 0;s.set(l,{depth:n,expanded:f,parent:i===a?null:a}),f&&o(l,n+1)}};return o(i,0),s}class Pe{constructor(e,t){this._tests=new Map,this._clearPreviousResultsWhenTestBegins=!1,this._rootSuite=new z("","root"),this._pathSeparator=e,this._reporter=t}dispatch(e){const{method:t,params:s}=e;if(t==="onBegin"){this._onBegin(s.config,s.projects);return}if(t==="onTestBegin"){this._onTestBegin(s.testId,s.result);return}if(t==="onTestEnd"){this._onTestEnd(s.test,s.result);return}if(t==="onStepBegin"){this._onStepBegin(s.testId,s.resultId,s.step);return}if(t==="onStepEnd"){this._onStepEnd(s.testId,s.resultId,s.step);return}if(t==="onError"){this._onError(s.error);return}if(t==="onStdIO"){this._onStdIO(s.type,s.testId,s.resultId,s.data,s.isBase64);return}if(t==="onEnd")return this._onEnd(s.result);if(t==="onExit")return this._onExit()}_setClearPreviousResultsWhenTestBegins(){this._clearPreviousResultsWhenTestBegins=!0}_onBegin(e,t){var s,o;this._rootDir=e.rootDir;for(const a of t){let n=this._rootSuite.suites.find(r=>r.project().id===a.id);n||(n=new z(a.name,"project"),this._rootSuite.suites.push(n),n.parent=this._rootSuite);const l=this._parseProject(a);if(n.project=()=>l,this._mergeSuitesInto(a.suites,n),e.listOnly){const r=new Set,h=m=>{m.tests.map(g=>g.testId).forEach(g=>r.add(g)),m.suites.forEach(h)};a.suites.forEach(h);const f=m=>{m.tests=m.tests.filter(g=>r.has(g.id)),m.suites.forEach(f)};f(n)}}(o=(s=this._reporter).onBegin)==null||o.call(s,this._parseConfig(e),this._rootSuite)}_onTestBegin(e,t){var a,n;const s=this._tests.get(e);this._clearPreviousResultsWhenTestBegins&&s._clearResults();const o=s._createTestResult(t.id);o.retry=t.retry,o.workerIndex=t.workerIndex,o.parallelIndex=t.parallelIndex,o.startTime=new Date(t.startTime),o.statusEx="running",(n=(a=this._reporter).onTestBegin)==null||n.call(a,s,o)}_onTestEnd(e,t){var a,n;const s=this._tests.get(e.testId);s.timeout=e.timeout,s.expectedStatus=e.expectedStatus,s.annotations=e.annotations;const o=s.resultsMap.get(t.id);o.duration=t.duration,o.status=t.status,o.statusEx=t.status,o.errors=t.errors,o.attachments=t.attachments,(n=(a=this._reporter).onTestEnd)==null||n.call(a,s,o)}_onStepBegin(e,t,s){var r,h;const o=this._tests.get(e),a=o.resultsMap.get(t),n=s.parentStepId?a.stepMap.get(s.parentStepId):void 0,l={titlePath:()=>[],title:s.title,category:s.category,location:this._absoluteLocation(s.location),parent:n,startTime:new Date(s.startTime),duration:0,steps:[]};n&&n.steps.push(l),a.stepMap.set(s.id,l),(h=(r=this._reporter).onStepBegin)==null||h.call(r,o,a,l)}_onStepEnd(e,t,s){var l,r;const o=this._tests.get(e),a=o.resultsMap.get(t),n=a.stepMap.get(s.id);n.duration=s.duration,n.error=s.error,(r=(l=this._reporter).onStepEnd)==null||r.call(l,o,a,n)}_onError(e){var t,s;(s=(t=this._reporter).onError)==null||s.call(t,e)}_onStdIO(e,t,s,o,a){var h,f,m,g;const n=a?globalThis.Buffer?Buffer.from(o,"base64"):atob(o):o,l=t?this._tests.get(t):void 0,r=l&&s?l.resultsMap.get(s):void 0;e==="stdout"?(f=(h=this._reporter).onStdOut)==null||f.call(h,n,l,r):(g=(m=this._reporter).onStdErr)==null||g.call(m,n,l,r)}_onEnd(e){var t,s;return((s=(t=this._reporter).onEnd)==null?void 0:s.call(t,e))||void 0}_onExit(){var e,t;return(t=(e=this._reporter).onExit)==null?void 0:t.call(e)}_parseConfig(e){const t=ce;return t.rootDir=e.rootDir,t.configFile=e.configFile,t.workers=e.workers,t}_parseProject(e){return{id:e.id,metadata:e.metadata,name:e.name,outputDir:this._absolutePath(e.outputDir),repeatEach:e.repeatEach,retries:e.retries,testDir:this._absolutePath(e.testDir),testIgnore:Y(e.testIgnore),testMatch:Y(e.testMatch),timeout:e.timeout,grep:Y(e.grep),grepInvert:Y(e.grepInvert),dependencies:e.dependencies,snapshotDir:this._absolutePath(e.snapshotDir),use:{}}}_mergeSuitesInto(e,t){for(const s of e){let o=t.suites.find(a=>a.title===s.title);o||(o=new z(s.title,s.type),o.parent=t,t.suites.push(o)),o.location=this._absoluteLocation(s.location),o._fileId=s.fileId,o._parallelMode=s.parallelMode,this._mergeSuitesInto(s.suites,o),this._mergeTestsInto(s.tests,o)}}_mergeTestsInto(e,t){for(const s of e){let o=t.tests.find(a=>a.title===s.title);o||(o=new Le(s.testId,s.title,this._absoluteLocation(s.location)),o.parent=t,t.tests.push(o),this._tests.set(o.id,o)),this._updateTest(s,o)}}_updateTest(e,t){return t.id=e.testId,t.location=this._absoluteLocation(e.location),t.retries=e.retries,t}_absoluteLocation(e){return e&&{...e,file:this._absolutePath(e.file)}}_absolutePath(e){return e&&this._rootDir+this._pathSeparator+e}}class z{constructor(e,t){this._requireFile="",this.suites=[],this.tests=[],this._parallelMode="default",this.title=e,this._type=t}allTests(){const e=[],t=s=>{for(const o of[...s.suites,...s.tests])o instanceof z?t(o):e.push(o)};return t(this),e}titlePath(){const e=this.parent?this.parent.titlePath():[];return(this.title||this._type!=="describe")&&e.push(this.title),e}project(){}}class Le{constructor(e,t,s){this.fn=()=>{},this.results=[],this.expectedStatus="passed",this.timeout=0,this.annotations=[],this.retries=0,this.repeatEachIndex=0,this.resultsMap=new Map,this.id=e,this.title=t,this.location=s}titlePath(){const e=this.parent?this.parent.titlePath():[];return e.push(this.title),e}outcome(){const e=this.results.filter(t=>t.status!=="skipped"&&t.status!=="interrupted");return e.length?e.every(t=>t.status===this.expectedStatus)?"expected":e.some(t=>t.status===this.expectedStatus)?"flaky":"unexpected":"skipped"}ok(){const e=this.outcome();return e==="expected"||e==="flaky"||e==="skipped"}_clearResults(){this.results=[],this.resultsMap.clear()}_createTestResult(e){const t={retry:this.results.length,parallelIndex:-1,workerIndex:-1,duration:-1,startTime:new Date,stdout:[],stderr:[],attachments:[],status:"skipped",statusEx:"scheduled",steps:[],errors:[],stepMap:new Map};return this.results.push(t),this.resultsMap.set(e,t),t}}const ce={forbidOnly:!1,fullyParallel:!1,globalSetup:null,globalTeardown:null,globalTimeout:0,grep:/.*/,grepInvert:null,maxFailures:0,metadata:{},preserveOutput:"always",projects:[],reporter:[[{}.CI?"dot":"list"]],reportSlowTests:{max:5,threshold:15e3},configFile:"",rootDir:"",quiet:!1,shard:null,updateSnapshots:"missing",version:"",workers:0,webServer:null};function Y(i){return i.map(e=>e.s?e.s:new RegExp(e.r.source,e.r.flags))}const We=({source:i})=>{const[e,t]=we(),[s,o]=L.useState(ve()),[a]=L.useState(be(()=>import("./assets/xtermModule-0fb1e5c9.js"),["./assets/xtermModule-0fb1e5c9.js","./xtermModule.6428296b.css"],import.meta.url).then(l=>l.default)),n=L.useRef(null);return L.useEffect(()=>(ke(o),()=>_e(o)),[]),L.useEffect(()=>{const l=i.write,r=i.clear;return(async()=>{const{Terminal:h,FitAddon:f}=await a,m=t.current;if(!m)return;const g=s==="dark-mode"?je:Oe;if(n.current&&n.current.terminal.options.theme===g)return;n.current&&(m.textContent="");const d=new h({convertEol:!0,fontSize:13,scrollback:1e4,fontFamily:"var(--vscode-editor-font-family)",theme:g}),c=new f;d.loadAddon(c);for(const w of i.pending)d.write(w);i.write=w=>{i.pending.push(w),d.write(w)},i.clear=()=>{i.pending=[],d.clear()},d.open(m),c.fit(),n.current={terminal:d,fitAddon:c}})(),()=>{i.clear=r,i.write=l}},[a,n,t,i,s]),L.useEffect(()=>{setTimeout(()=>{n.current&&(n.current.fitAddon.fit(),i.resize(n.current.terminal.cols,n.current.terminal.rows))},250)},[e,i]),p("div",{"data-testid":"output",className:"xterm-wrapper",style:{flex:"auto"},ref:t})},Oe={foreground:"#383a42",background:"#fafafa",cursor:"#383a42",black:"#000000",red:"#e45649",green:"#50a14f",yellow:"#c18401",blue:"#4078f2",magenta:"#a626a4",cyan:"#0184bc",white:"#a0a0a0",brightBlack:"#000000",brightRed:"#e06c75",brightGreen:"#98c379",brightYellow:"#d19a66",brightBlue:"#4078f2",brightMagenta:"#a626a4",brightCyan:"#0184bc",brightWhite:"#383a42",selectionBackground:"#d7d7d7",selectionForeground:"#383a42"},je={foreground:"#f8f8f2",background:"#1e1e1e",cursor:"#f8f8f0",black:"#000000",red:"#ff5555",green:"#50fa7b",yellow:"#f1fa8c",blue:"#bd93f9",magenta:"#ff79c6",cyan:"#8be9fd",white:"#bfbfbf",brightBlack:"#4d4d4d",brightRed:"#ff6e6e",brightGreen:"#69ff94",brightYellow:"#ffffa5",brightBlue:"#d6acff",brightMagenta:"#ff92df",brightCyan:"#a4ffff",brightWhite:"#e6e6e6",selectionBackground:"#44475a",selectionForeground:"#f8f8f2"};function ze(i){return`.playwright-artifacts-${i}`}let te=()=>{},de=i=>{},ue={cols:80,rows:24};const W={pending:[],clear:()=>{},write:i=>W.pending.push(i),resize:(i,e)=>{ue={cols:i,rows:e},U("resizeTerminal",{cols:i,rows:e})}},Ae=({})=>{var ie;const[i,e]=v.useState(""),[t,s]=v.useState(!1),[o,a]=v.useState(new Map([["passed",!1],["failed",!1],["skipped",!1]])),[n,l]=v.useState(new Map),[r,h]=v.useState({config:void 0,rootSuite:void 0}),[f,m]=v.useState(),[g,d]=v.useState({}),[c,w]=v.useState(new Set),[b,F]=v.useState(!1),[M,R]=v.useState(),[C,$]=Se("watch-all",!1),[G,A]=v.useState({value:new Set}),u=v.useRef(Promise.resolve()),_=v.useRef(new Set),[k,x]=v.useState(0),E=v.useRef(null),S=()=>{F(!0),A({value:new Set}),te(ce,new z("","root"),void 0),fe(!0).then(()=>{F(!1)})};v.useEffect(()=>{var D;(D=E.current)==null||D.focus(),S()},[]),te=(D,V,B)=>{const P=D.configFile?le.getObject(D.configFile+":projects",void 0):void 0;for(const N of n.keys())V.suites.find(q=>q.title===N)||n.delete(N);for(const N of V.suites)n.has(N.title)||n.set(N.title,!!(P!=null&&P.includes(N.title)));!P&&n.size&&![...n.values()].includes(!0)&&n.set(n.entries().next().value[0],!0),h({config:D,rootSuite:V}),l(new Map(n)),M&&B?m({...B,total:M.testIds.size}):B||m(void 0)};const I=v.useCallback((D,V)=>{D==="bounce-if-busy"&&M||(_.current=new Set([..._.current,...V]),u.current=u.current.then(async()=>{var N,q,ne;const B=_.current;if(_.current=new Set,!B.size)return;{for(const j of((N=r.rootSuite)==null?void 0:N.allTests())||[])B.has(j.id)&&(j._clearResults(),j._createTestResult("pending"));h({...r})}const P="  ["+new Date().toLocaleTimeString()+"]";W.write("\x1B[2m—".repeat(Math.max(0,ue.cols-P.length))+P+"\x1B[22m"),m({total:B.size,passed:0,failed:0,skipped:0}),R({testIds:B}),await Z("run",{testIds:[...B]});for(const j of((q=r.rootSuite)==null?void 0:q.allTests())||[])((ne=j.results[0])==null?void 0:ne.duration)===-1&&j._clearResults();h({...r}),R(void 0)}))},[M,r]),O=!!M;return p("div",{className:"vbox ui-mode",children:T(Te,{sidebarSize:250,orientation:"horizontal",sidebarIsFirst:!0,children:[T("div",{className:"vbox",children:[T("div",{className:"vbox"+(t?"":" hidden"),children:[T(H,{children:[p("div",{className:"section-title",style:{flex:"none"},children:"Output"}),p(y,{icon:"circle-slash",title:"Clear output",onClick:()=>W.clear()}),p("div",{className:"spacer"}),p(y,{icon:"close",title:"Close",onClick:()=>s(!1)})]}),p(We,{source:W})]}),p("div",{className:"vbox"+(t?" hidden":""),children:p(Ue,{item:g,rootDir:(ie=r.config)==null?void 0:ie.rootDir})})]}),T("div",{className:"vbox ui-mode-sidebar",children:[T(H,{noShadow:!0,noMinHeight:!0,children:[p("img",{src:"icon-32x32.png"}),p("div",{className:"section-title",children:"Playwright"}),p(y,{icon:"color-mode",title:"Toggle color mode",onClick:()=>xe()}),p(y,{icon:"refresh",title:"Reload",onClick:()=>S(),disabled:O||b}),p(y,{icon:"terminal",title:"Toggle output",toggled:t,onClick:()=>{s(!t)}})]}),p(Ie,{filterText:i,setFilterText:e,statusFilters:o,setStatusFilters:a,projectFilters:n,setProjectFilters:l,testModel:r,runTests:()=>I("bounce-if-busy",c)}),T(H,{noMinHeight:!0,children:[!O&&!f&&p("div",{className:"section-title",children:"Tests"}),!O&&f&&p("div",{"data-testid":"status-line",className:"status-line",children:T("div",{children:[f.passed,"/",f.total," passed (",f.passed/f.total*100|0,"%)"]})}),O&&f&&p("div",{"data-testid":"status-line",className:"status-line",children:T("div",{children:["Running ",f.passed,"/",M.testIds.size," passed (",f.passed/M.testIds.size*100|0,"%)"]})}),p(y,{icon:"play",title:"Run all",onClick:()=>I("bounce-if-busy",c),disabled:O||b}),p(y,{icon:"debug-stop",title:"Stop",onClick:()=>U("stop"),disabled:!O||b}),p(y,{icon:"eye",title:"Watch all",toggled:C,onClick:()=>$(!C)}),p(y,{icon:"collapse-all",title:"Collapse all",onClick:()=>{x(k+1)}})]}),p(Ke,{statusFilters:o,projectFilters:n,filterText:i,testModel:r,runningState:M,runTests:I,onItemSelected:d,setVisibleTestIds:w,watchAll:C,watchedTreeIds:G,setWatchedTreeIds:A,isLoading:b,requestedCollapseAllCount:k})]})]})})},Ie=({filterText:i,setFilterText:e,statusFilters:t,setStatusFilters:s,projectFilters:o,setProjectFilters:a,testModel:n,runTests:l})=>{const[r,h]=v.useState(!1),f=v.useRef(null);v.useEffect(()=>{var d;(d=f.current)==null||d.focus()},[]);const m=[...t.entries()].filter(([d,c])=>c).map(([d])=>d).join(" ")||"all",g=[...o.entries()].filter(([d,c])=>c).map(([d])=>d).join(" ")||"all";return T("div",{className:"filters",children:[p(Ee,{expanded:r,setExpanded:h,title:p("input",{ref:f,type:"search",placeholder:"Filter (e.g. text, @tag)",spellCheck:!1,value:i,onChange:d=>{e(d.target.value)},onKeyDown:d=>{d.key==="Enter"&&l()}})}),T("div",{className:"filter-summary",title:"Status: "+m+`
Projects: `+g,onClick:()=>h(!r),children:[p("span",{className:"filter-label",children:"Status:"})," ",m,p("span",{className:"filter-label",children:"Projects:"})," ",g]}),r&&T("div",{className:"hbox",style:{marginLeft:14},children:[p("div",{className:"filter-list",children:[...t.entries()].map(([d,c])=>p("div",{className:"filter-entry",children:T("label",{children:[p("input",{type:"checkbox",checked:c,onClick:()=>{const w=new Map(t);w.set(d,!w.get(d)),s(w)}}),p("div",{children:d})]})}))}),p("div",{className:"filter-list",children:[...o.entries()].map(([d,c])=>p("div",{className:"filter-entry",children:T("label",{children:[p("input",{type:"checkbox",checked:c,onClick:()=>{var F;const w=new Map(o);w.set(d,!w.get(d)),a(w);const b=(F=n==null?void 0:n.config)==null?void 0:F.configFile;b&&le.setObject(b+":projects",[...w.entries()].filter(([M,R])=>R).map(([M])=>M))}}),p("div",{children:d})]})}))})]})]})},Ve=Fe,Ke=({statusFilters:i,projectFilters:e,filterText:t,testModel:s,runTests:o,runningState:a,watchAll:n,watchedTreeIds:l,setWatchedTreeIds:r,isLoading:h,onItemSelected:f,setVisibleTestIds:m,requestedCollapseAllCount:g})=>{const[d,c]=v.useState({expandedItems:new Map}),[w,b]=v.useState(),[F,M]=v.useState(g),{rootItem:R,treeItemMap:C,fileNames:$}=v.useMemo(()=>{let u=Ye(s.rootSuite,e);Xe(u,t,i,a==null?void 0:a.testIds),pe(u),u=He(u),Je(u);const _=new Map,k=new Set,x=new Set,E=S=>{S.kind==="group"&&S.location.file&&x.add(S.location.file),S.kind==="case"&&S.tests.forEach(I=>k.add(I.id)),S.children.forEach(E),_.set(S.id,S)};return E(u),m(k),{rootItem:u,treeItemMap:_,fileNames:x}},[t,s,i,e,m,a]);v.useEffect(()=>{if(F!==g){d.expandedItems.clear();for(const k of C.keys())d.expandedItems.set(k,!1);M(g),b(void 0),c({...d});return}if(!a||a.itemSelectedByUser)return;let u;const _=k=>{var x;k.children.forEach(_),!u&&k.status==="failed"&&(k.kind==="test"&&a.testIds.has(k.test.id)||k.kind==="case"&&a.testIds.has((x=k.tests[0])==null?void 0:x.id))&&(u=k)};_(R),u&&b(u.id)},[a,b,R,F,M,g,d,c,C]);const{selectedTreeItem:G}=v.useMemo(()=>{const u=w?C.get(w):void 0,_=u==null?void 0:u.location;let k;return(u==null?void 0:u.kind)==="test"?k=u.test:(u==null?void 0:u.kind)==="case"&&u.tests.length===1&&(k=u.tests[0]),f({testCase:k,location:_}),{selectedTreeItem:u}},[f,w,C]);v.useEffect(()=>{if(n)U("watch",{fileNames:[...$]});else{const u=new Set;for(const _ of l.value){const k=C.get(_),x=k==null?void 0:k.location.file;x&&u.add(x)}U("watch",{fileNames:[...u]})}},[R,$,n,l,C]);const A=u=>{b(u.id),o("bounce-if-busy",ee(u))};return de=u=>{const _=[],k=new Set(u);if(n){const x=E=>{const S=E.location.file;S&&k.has(S)&&_.push(...ee(E)),E.kind==="group"&&E.subKind==="folder"&&E.children.forEach(x)};x(R)}else for(const x of l.value){const E=C.get(x),S=E==null?void 0:E.location.file;S&&k.has(S)&&_.push(...ee(E))}o("queue-if-busy",new Set(_))},p(Ve,{treeState:d,setTreeState:c,rootItem:R,dataTestId:"test-tree",render:u=>T("div",{className:"hbox ui-mode-list-item",children:[p("div",{className:"ui-mode-list-item-title",children:u.title}),!!u.duration&&u.status!=="skipped"&&p("div",{className:"ui-mode-list-item-time",children:Me(u.duration)}),T(H,{noMinHeight:!0,noShadow:!0,children:[p(y,{icon:"play",title:"Run",onClick:()=>A(u),disabled:!!a}),p(y,{icon:"go-to-file",title:"Open in VS Code",onClick:()=>U("open",{location:qe(u)})}),!n&&p(y,{icon:"eye",title:"Watch",onClick:()=>{l.value.has(u.id)?l.value.delete(u.id):l.value.add(u.id),r({...l})},toggled:l.value.has(u.id)})]})]}),icon:u=>u.status==="scheduled"?"codicon-clock":u.status==="running"?"codicon-loading":u.status==="failed"?"codicon-error":u.status==="passed"?"codicon-check":u.status==="skipped"?"codicon-circle-slash":"codicon-circle-outline",selectedItem:G,onAccepted:A,onSelected:u=>{a&&(a.itemSelectedByUser=!0),b(u.id)},autoExpandDeep:!!t,noItemsMessage:h?"Loading…":"No tests"})},Ue=({item:i,rootDir:e})=>{const[t,s]=v.useState(),[o,a]=v.useState(0),n=v.useRef(null),{outputDir:l,result:r}=v.useMemo(()=>{var w;const d=i.testCase?$e(i.testCase):void 0,c=(w=i.testCase)==null?void 0:w.results[0];return{outputDir:d,result:c}},[i]),[h,f]=v.useState(),m=v.useCallback(d=>f(oe(d)),[f]),g=h?t==null?void 0:t.actions.find(d=>oe(d)===h):void 0;return v.useEffect(()=>{var w;if(n.current&&clearTimeout(n.current),!r){s(void 0);return}const d=r&&r.duration>=0&&r.attachments.find(b=>b.name==="trace");if(d&&d.path){ae(d.path).then(b=>s(b));return}if(!l){s(void 0);return}const c=`${l}/${ze(r.workerIndex)}/traces/${(w=i.testCase)==null?void 0:w.id}.json`;return n.current=setTimeout(async()=>{try{const b=await ae(c);s(b)}catch{s(void 0)}finally{a(o+1)}},500),()=>{n.current&&clearTimeout(n.current)}},[r,l,i,s,o,a]),p(ye,{model:t,hideTimelineBars:!0,hideStackFrames:!0,showSourcesFirst:!0,rootDir:e,initialSelection:g,onSelectionChanged:m,defaultSourceLocation:i.location},"workbench")};let K,Q,J;const re=()=>{clearTimeout(Q),Q=void 0,te(J.config,J.rootSuite,J.progress)},X=(i,e,t,s=!1)=>{J={config:i,rootSuite:e,progress:t},s?re():Q||(Q=setTimeout(re,250))},fe=i=>{if(!i)return Z("list",{});let e;const t={passed:0,failed:0,skipped:0};let s;return K=new Pe(se,{onBegin:(o,a)=>{e||(e=a),s=o,t.passed=0,t.failed=0,t.skipped=0,X(s,e,t,!0)},onEnd:()=>{X(s,e,t,!0)},onTestBegin:()=>{X(s,e,t)},onTestEnd:o=>{o.outcome()==="skipped"?++t.skipped:o.outcome()==="unexpected"?++t.failed:++t.passed,X(s,e,t)},onError:o=>{W.write((o.stack||o.value||"")+`
`)}}),K._setClearPreviousResultsWhenTestBegins(),Z("list",{})};window.dispatch=i=>{var e;if(i.method==="listChanged"){fe(!1).catch(()=>{});return}if(i.method==="testFilesChanged"){de(i.params.testFileNames);return}if(i.method==="stdio"){if(i.params.buffer){const t=atob(i.params.buffer);W.write(t)}else W.write(i.params.text);return}(e=K==null?void 0:K.dispatch(i))==null||e.catch(()=>{})};const Z=async(i,e)=>{await window.sendMessage({method:i,params:e})},U=(i,e)=>{if(window._overrideProtocolForTest){window._overrideProtocolForTest({method:i,params:e}).catch(()=>{});return}Z(i,e).catch(t=>{console.error(t)})},$e=i=>{var e;for(let t=i.parent;t;t=t.parent)if(t.project())return(e=t.project())==null?void 0:e.outputDir},qe=i=>{if(i)return i.location.file+":"+i.location.line},ee=i=>{const e=new Set;if(!i)return e;const t=s=>{var o;s.kind==="case"?s.tests.map(a=>a.id).forEach(a=>e.add(a)):s.kind==="test"?e.add(s.id):(o=s.children)==null||o.forEach(t)};return t(i),e};function he(i,e,t,s){if(e.length===0)return i;const o=e.join(se),a=s.get(o);if(a)return a;const n=he(i,e.slice(0,e.length-1),!1,s),l={kind:"group",subKind:t?"file":"folder",id:o,title:e[e.length-1],location:{file:o,line:0,column:0},duration:0,parent:n,children:[],status:"none"};return n.children.push(l),s.set(o,l),l}function Ye(i,e){const t=[...e.values()].some(Boolean),s={kind:"group",subKind:"folder",id:"root",title:"",location:{file:"",line:0,column:0},duration:0,parent:void 0,children:[],status:"none"},o=(n,l,r)=>{for(const h of l.suites){const f=h.title||"<anonymous>";let m=r.children.find(g=>g.title===f);m||(m={kind:"group",subKind:"describe",id:r.id+""+f,title:f,location:h.location,duration:0,parent:r,children:[],status:"none"},r.children.push(m)),o(n,h,m)}for(const h of l.tests){const f=h.title;let m=r.children.find(c=>c.title===f);m||(m={kind:"case",id:r.id+""+f,title:f,parent:r,children:[],tests:[],location:h.location,duration:0,status:"none"},r.children.push(m));const g=h.results[0];let d="none";(g==null?void 0:g.statusEx)==="scheduled"?d="scheduled":(g==null?void 0:g.statusEx)==="running"?d="running":(g==null?void 0:g.status)==="skipped"?d="skipped":(g==null?void 0:g.status)==="interrupted"?d="none":g&&h.outcome()!=="expected"?d="failed":g&&h.outcome()==="expected"&&(d="passed"),m.tests.push(h),m.children.push({kind:"test",id:h.id,title:n,location:h.location,test:h,parent:m,children:[],status:d,duration:h.results.length?Math.max(0,h.results[0].duration):0,project:n}),m.duration=m.children.reduce((c,w)=>c+w.duration,0)}},a=new Map;for(const n of(i==null?void 0:i.suites)||[])if(!(t&&!e.get(n.title)))for(const l of n.suites){const r=he(s,l.location.file.split(se),!0,a);o(n.title,l,r)}return s}function Xe(i,e,t,s){const o=e.trim().toLowerCase().split(" "),a=[...t.values()].some(Boolean),n=r=>{const h=r.tests[0].titlePath().join(" ").toLowerCase();return!o.every(f=>h.includes(f))&&!r.tests.some(f=>s==null?void 0:s.has(f.id))?!1:(r.children=r.children.filter(f=>!a||(s==null?void 0:s.has(f.id))||t.get(f.status)),r.tests=r.children.map(f=>f.test),!!r.children.length)},l=r=>{const h=[];for(const f of r.children)f.kind==="case"?n(f)&&h.push(f):(l(f),f.children.length&&h.push(f));r.children=h};l(i)}function pe(i){for(const n of i.children)pe(n);i.kind==="group"&&i.children.sort((n,l)=>n.location.file.localeCompare(l.location.file)||n.location.line-l.location.line);let e=i.children.length>0,t=i.children.length>0,s=!1,o=!1,a=!1;for(const n of i.children)t=t&&n.status==="skipped",e=e&&(n.status==="passed"||n.status==="skipped"),s=s||n.status==="failed",o=o||n.status==="running",a=a||n.status==="scheduled";o?i.status="running":a?i.status="scheduled":s?i.status="failed":t?i.status="skipped":e&&(i.status="passed")}function He(i){let e=i;for(;e.children.length===1&&e.children[0].kind==="group"&&e.children[0].subKind==="folder";)e=e.children[0];return e.location=i.location,e}function Je(i){const e=t=>{t.kind==="case"&&t.children.length===1?t.children=[]:t.children.forEach(e)};e(i)}async function ae(i){const e=new URLSearchParams;e.set("trace",i);const s=await(await fetch(`contexts?${e.toString()}`)).json();return new Ce(s)}const se=navigator.userAgent.toLowerCase().includes("windows")?"\\":"/";(async()=>(Re(),window.location.protocol!=="file:"&&(window.location.href.includes("isUnderTest=true")&&await new Promise(i=>setTimeout(i,1e3)),navigator.serviceWorker.register("sw.bundle.js"),navigator.serviceWorker.controller||await new Promise(i=>{navigator.serviceWorker.oncontrollerchange=()=>i()}),setInterval(function(){fetch("ping")},1e4)),Be.render(p(Ae,{}),document.querySelector("#root"))))();