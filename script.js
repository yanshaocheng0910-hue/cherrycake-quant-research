const baseModules = [
  {
    id: "workbench",
    number: "01",
    category: "market",
    categoryLabel: "市场与行情",
    title: "看盘工作台",
    route: "/workbench",
    summary: "把自选、持仓、板块、指数、市场热度、资金变化和数据源状态放进一个日常总览入口。",
    purpose: "先确认今天的市场状态和关注对象，再决定进入哪一个研究页面。",
    usage: ["打开工作台，先查看行情时间、数据源连接和市场概览。", "搜索股票、ETF、指数、板块或功能页面。", "从自选、板块、指数和情绪入口继续进入单股或结构研究。", "用分组、排序和关注设置固定高频观察对象。"],
    results: ["减少在多个页面之间反复搜索。", "先看市场整体状态，再进入单股研究。", "区分实时、缓存和历史回补数据。"],
    tags: ["市场总览", "自选联动", "数据状态"],
    features: [
      { name: "市场总览", detail: "集中查看指数、情绪、成交和数据更新时间；适合每天打开后先判断研究方向。", label: "先看整体" },
      { name: "自选与持仓入口", detail: "按分组进入关注对象，并继续跳转指标机器人、异动中心和策略筛选。", label: "连续跳转" },
      { name: "搜索与页面导航", detail: "搜索标的或功能，避免从多个菜单层级里手工寻找。", label: "快速定位" }
    ],
    screenshots: ["01-workbench.png", "01-workbench-mobile.png", "01-workbench-detail.png"]
  },
  {
    id: "robot",
    number: "02",
    category: "market",
    categoryLabel: "市场与行情",
    title: "指标机器人",
    route: "/robot",
    summary: "将多周期 K 线、DK / DKX、MACD、EMA、资金线、评分、关键价位和信号生命周期放到单股研究入口。",
    purpose: "回答一只股票当前怎么样，并且能从结论下钻回逐根 K 线和信号证据。",
    usage: ["输入股票代码或从工作台、板块、排行榜进入。", "切换分钟、小时、日线、周线和月线周期。", "先看动作、评分、趋势和风险，再查看关键价位与指标叠加。", "在简化模式快速判断，在专业模式展开完整证据。"],
    results: ["将趋势、结构、资金和风险拆成可读维度。", "支撑、阻力和止损分别表达，形成风险边界。", "同一套信号语义可以被异动和回测复用。"],
    tags: ["多周期", "指标引擎", "关键价位", "信号解释"],
    features: [
      { name: "简化与专业模式", detail: "简化模式用于快速看结论，专业模式展开 K 线、叠加指标和信号证据。", label: "两种阅读层级" },
      { name: "多周期切换", detail: "同时观察 1 分钟到月线的状态，区分短线变化与大周期背景。", label: "周期对照" },
      { name: "关键价位", detail: "展示支撑位、阻力位和止损位及其来源，避免只给一个无边界的买卖标签。", label: "风险边界" },
      { name: "信号生命周期", detail: "记录候选、确认、保持、撤回和结束，让历史信号可以被回看。", label: "可回看" }
    ],
    screenshots: ["02-robot-simple.png", "02-robot-professional.png", "02-robot-timeframes.png", "02-robot-position-levels.png", "02-robot-mobile.png"]
  },
  {
    id: "review",
    number: "03",
    category: "research",
    categoryLabel: "研究与验证",
    title: "A 股复盘中心",
    route: "/a-share-review",
    summary: "把市场宽度、涨停与炸板、连板梯队、赚钱效应、情绪周期和次日验证组织成收盘复盘流程。",
    purpose: "从当天的市场事实出发，形成第二天可以核对的条件，而不是只浏览几张涨停表。",
    usage: ["先看复盘看板，确认市场宽度、封板质量和接力表现。", "查看涨停、炸板、跌停和昨日强势股的隔日反馈。", "进入首板分析和连板天梯，观察板位、封板和换手。", "保存明日验证条件，次日进入竞价核验对照真实数据。"],
    results: ["形成事实、历史位置和次日验证的复盘闭环。", "赚钱效应和亏钱效应使用明确样本口径。", "数据缺失、来源和事实日期直接显示。"],
    tags: ["收盘复盘", "连板天梯", "情绪周期", "次日验证"],
    features: [
      { name: "复盘看板", detail: "汇总市场宽度、涨停、炸板、连板和接力表现，先建立当日市场全貌。", label: "一屏总览" },
      { name: "首板与连板分析", detail: "按板位、封板时间、开板、封单和换手查看短线结构。", label: "结构拆解" },
      { name: "情绪周期与历史分位", detail: "将当日情绪放回历史样本中比较，避免只凭主观体感判断温度。", label: "历史对照" },
      { name: "明日验证与竞价核验", detail: "选择指标、比较方式和阈值保存条件，次日检查是否被真实盘前数据验证。", label: "跨日闭环" }
    ],
    screenshots: ["03-review-dashboard.png", "03-review-market-data.png", "03-review-first-board.png", "03-review-ladder.png", "03-review-sentiment.png", "03-review-verification.png", "03-review-auction.png"]
  },
  {
    id: "plates",
    number: "04",
    category: "market",
    categoryLabel: "市场与行情",
    title: "板块与指数中心",
    route: "/plates",
    summary: "从行业、概念和指数观察市场结构，连接板块轮动、资金趋势、成分股和个股研究。",
    purpose: "判断一只股票的变化来自市场整体、板块轮动，还是个股自身。",
    usage: ["选择行业板块、概念板块或主要指数。", "查看板块涨跌、成交额、强弱排名和成分股。", "对照资金快照、分钟趋势和数据日期。", "从成分股继续进入指标机器人或策略候选。"],
    results: ["把单股研究放回所属市场结构。", "资金曲线保留样本范围、日期和计算口径。", "排行、趋势、成分股和个股研究连续跳转。"],
    tags: ["板块轮动", "资金趋势", "成分股", "指数对照"],
    features: [
      { name: "板块总览", detail: "按行业或概念比较涨跌、成交和强弱排名，定位市场正在发生变化的方向。", label: "结构入口" },
      { name: "资金快照与趋势", detail: "同时查看当前快照和分钟资金趋势，并明确日期与样本口径。", label: "口径清楚" },
      { name: "成分股下钻", detail: "从板块直接查看成分股，再进入单股指标和策略研究。", label: "由面到点" }
    ],
    screenshots: ["04-plates-overview.png", "04-plates-fund-flow.png", "04-plates-constituents.png", "04-indices.png"]
  },
  {
    id: "ranking",
    number: "05",
    category: "market",
    categoryLabel: "市场与行情",
    title: "排行榜",
    route: "/ranking",
    summary: "用涨幅、成交、估值、指标状态、板块表现和机器人信号等维度快速发现候选对象。",
    purpose: "把我应该先看哪些股票变成可重复运行的发现入口。",
    usage: ["选择市场、板块或排行维度。", "调整排序方向、数量和筛选条件。", "点击股票查看实时摘要或进入指标机器人。", "使用信号排行缩小到特定动作或风险状态。"],
    results: ["减少手工翻找。", "发现候选后立即查看单股证据。"],
    tags: ["多维排序", "候选发现", "信号排行"],
    features: [
      { name: "多维排行榜", detail: "按涨幅、成交、估值或板块表现组织候选列表，适合快速扫描。", label: "快速发现" },
      { name: "机器人信号排行", detail: "只看处于特定动作、趋势或风险状态的标的，再进入详细研究。", label: "信号筛选" }
    ],
    screenshots: ["05-ranking.png", "05-ranking-signals.png"]
  },
  {
    id: "screener",
    number: "06",
    category: "research",
    categoryLabel: "研究与验证",
    title: "策略选股",
    route: "/screener",
    summary: "将趋势方向、评分区间、指标状态、成交和板块归属等研究想法写成结构化筛选条件。",
    purpose: "把模糊的选股想法变成可以保存、重复运行、解释命中原因的规则。",
    usage: ["新建策略并添加一个或多个条件。", "选择全部满足或任一满足等组合方式。", "运行筛选，查看候选数量、命中条件和列表。", "保存策略，继续进入单股研究或综合评分回测。"],
    results: ["候选池可以重复生成。", "每个候选都有命中解释。", "筛选、研究和回测连接成一个工作流。"],
    tags: ["规则组合", "候选池", "命中解释", "策略复用"],
    features: [
      { name: "条件编辑器", detail: "选择指标、方向、评分、成交或板块字段，形成一套可保存的策略。", label: "结构化输入" },
      { name: "组合逻辑", detail: "支持全部满足、任一满足等组合方式，表达不同研究假设。", label: "规则组合" },
      { name: "结果与命中解释", detail: "展示候选数量、命中条件和下一步入口，用户知道股票为何进入列表。", label: "结果可解释" }
    ],
    screenshots: ["06-screener-empty.png", "06-screener-conditions.png", "06-screener-results.png", "06-screener-explanation.png"]
  },
  {
    id: "value",
    number: "07",
    category: "research",
    categoryLabel: "研究与验证",
    title: "价值投资中心与 PEG 估值",
    route: "/value-investing + /peg",
    summary: "将财务、业务、估值、同业比较和研究命题放在一起，并对 PEG 的输入、适用性和缺失项做检查。",
    purpose: "基本面研究不只输出一个数字，还要让输入、来源和适用边界可见。",
    usage: ["选择股票，查看财务、业务和估值摘要。", "进入 PEG 页面确认现价、PE、增长率和数据来源。", "检查负增长、字段缺失和不适用状态。", "在个股深挖中整理支持与反对证据并保存记录。"],
    results: ["区分算不出来和结果不适用。", "研究结论保留输入字段与来源。", "估值结果可以继续交给 AI 做只读整理。"],
    tags: ["基本面", "PEG", "估值边界", "证据链"],
    features: [
      { name: "价值研究总览", detail: "整理财务、业务、估值和同业比较，形成进入个股研究的基本面上下文。", label: "研究入口" },
      { name: "PEG 输入与结果", detail: "展示计算所需字段、来源、计算结果和时间状态，不隐藏输入。", label: "透明计算" },
      { name: "缺失与不适用", detail: "增长率为负或关键字段缺失时，明确提示边界，不强行解释结果。", label: "诚实状态" }
    ],
    screenshots: ["07-value-research-overview.png", "07-value-research-evidence.png", "07-peg-inputs.png", "07-peg-result.png", "07-peg-limitations.png"]
  },
  {
    id: "alerts",
    number: "08",
    category: "research",
    categoryLabel: "研究与验证",
    title: "异动中心",
    route: "/alerts + /alerts/detail",
    summary: "监控指标信号的出现、确认、保持和结束，并按股票、周期、方向和多周期共振筛选。",
    purpose: "从一只股票反查发生了什么，也能从全市场反向寻找刚出现的信号。",
    usage: ["选择持仓、自选、全部股票或指定扫描范围。", "按周期、方向、指标和信号状态筛选。", "查看当前有效信号和首次触发时间。", "进入单股详情查看所有周期的生命周期历史。"],
    results: ["预警、确认和历史结束记录分开。", "信号保留触发与结束时间。", "详情可以继续跳转机器人和回测。"],
    tags: ["信号监控", "生命周期", "多周期共振", "历史记录"],
    features: [
      { name: "范围与条件筛选", detail: "按自选、持仓、周期、方向和指标缩小扫描范围，快速定位需要关注的信号。", label: "可控扫描" },
      { name: "信号生命周期", detail: "将候选、确认、保持、撤回和结束按时间记录，避免把短暂预警当成持续有效。", label: "过程记录" },
      { name: "单股异动详情", detail: "集中查看一只股票的多个周期状态和历史，再进入 K 线证据。", label: "下钻核对" }
    ],
    screenshots: ["08-alerts-overview.png", "08-alerts-filters.png", "08-alert-detail.png", "08-alert-history.png"]
  },
  {
    id: "watchlist",
    number: "09",
    category: "market",
    categoryLabel: "市场与行情",
    title: "自选中心",
    route: "/watchlist",
    summary: "按研究主题、策略候选和持仓对象管理自选分组，并作为其他页面的输入池。",
    purpose: "让自选不只是收藏列表，而是工作台、异动和策略研究之间的连接。",
    usage: ["创建或选择自选分组。", "添加、删除、排序股票并填写备注。", "对当前分组运行标准策略或自定义筛选。", "批量进入指标机器人或异动扫描。"],
    results: ["不同研究主题可以分组管理。", "关注对象可以被其他研究模块复用。"],
    tags: ["分组管理", "备注", "策略输入池"],
    features: [
      { name: "分组与编辑", detail: "按持仓、主题或策略候选建立分组，支持添加、删除、排序和备注。", label: "整理对象" },
      { name: "分组策略筛选", detail: "只对当前自选组运行筛选，缩小研究范围并保留上下文。", label: "局部研究" }
    ],
    screenshots: ["09-watchlist-groups.png", "09-watchlist-edit.png", "09-watchlist-strategy.png"]
  },
  {
    id: "backtest",
    number: "10",
    category: "research",
    categoryLabel: "研究与验证",
    title: "回测中心",
    route: "/backtest",
    summary: "在明确的日期窗口内比较信号模式、周期和持有期，输出收益、回撤、交易数量、胜率和逐笔明细。",
    purpose: "把策略表现放回真实历史窗口中，用可核对的交易过程检验研究想法。",
    usage: ["选择股票、周期、起止日期和信号模式。", "设置持有期与过滤条件后运行回测。", "查看收益曲线、结果指标、数据覆盖和风险。", "点击交易回到对应 K 线位置，核验当时信号。"],
    results: ["与同期买入持有放在同一窗口比较。", "区分已平仓、未平仓、最大回撤和数据覆盖。", "缺少真实行情时明确无法计算。"],
    tags: ["历史窗口", "收益曲线", "逐笔成交", "数据审计"],
    features: [
      { name: "回测参数", detail: "选择标的、周期、日期窗口、信号模式和持有期，明确执行假设。", label: "可复现输入" },
      { name: "结果与曲线", detail: "查看收益、回撤、胜率、交易数量和收益曲线，并与同期持有对照。", label: "结果比较" },
      { name: "逐笔成交核验", detail: "从交易明细回到对应 K 线和信号，检查结果是否符合当时可见信息。", label: "逐笔追溯" },
      { name: "数据覆盖审计", detail: "展示时间范围、来源和缺失状态，不使用随机数据填补生产缺口。", label: "边界明确" }
    ],
    screenshots: ["10-backtest-form.png", "10-backtest-results.png", "10-backtest-trades.png", "10-backtest-chart.png", "10-backtest-audit.png"]
  },
  {
    id: "paper",
    number: "11",
    category: "research",
    categoryLabel: "研究与验证",
    title: "模拟交易",
    route: "/paper",
    summary: "提供虚拟资金、模拟买卖、持仓、盈亏和订单记录，用于演练研究结论的执行过程。",
    purpose: "将研究结论延伸到仓位与执行，但不连接真实资金和下单接口。",
    usage: ["查看模拟账户资金和当前持仓。", "输入股票、方向、数量和价格提交模拟订单。", "查看订单状态、持仓成本和盈亏。", "结合指标与回测结果复盘一次模拟决策。"],
    results: ["观察成本、仓位和交易记录。", "不承担真实资金风险，也不会误触真实下单。"],
    tags: ["虚拟资金", "订单", "持仓", "盈亏"],
    features: [
      { name: "模拟账户", detail: "保存虚拟资金、当前权益和交易状态，提供可重复的演练环境。", label: "执行练习" },
      { name: "模拟订单", detail: "以股票、方向、数量和价格提交买卖记录，不请求真实交易通道。", label: "只读风险" },
      { name: "持仓与盈亏", detail: "查看成本、浮动盈亏和已实现盈亏，回看研究结论的执行结果。", label: "结果回看" }
    ],
    screenshots: ["11-paper-account.png", "11-paper-order.png", "11-paper-positions.png"]
  },
  {
    id: "quality",
    number: "12",
    category: "research",
    categoryLabel: "研究与验证",
    title: "信号质量统计",
    route: "/quality",
    summary: "检查指标信号出现后未来若干根 K 线的表现，并与无条件基准进行比较。",
    purpose: "让工具接受样本检验，而不是只展示少数漂亮的个案。",
    usage: ["选择股票和信号类型。", "查看候选、确认和结束事件的样本数量。", "对照信号后 5、10、20 根的收益分布和基准。", "结合样本量、覆盖范围和窗口判断稳定性。"],
    results: ["区分信号出现过和信号具有区分度。", "结果带有样本数量和时间范围。"],
    tags: ["样本统计", "未来收益", "基准对照"],
    features: [
      { name: "事件样本表", detail: "按候选、确认和结束事件汇总样本量、覆盖范围和统计结果。", label: "样本口径" },
      { name: "未来收益窗口", detail: "观察信号后 5、10、20 根 K 线的收益分布，不只看单次命中。", label: "统计验证" },
      { name: "基准对照", detail: "与无条件基准比较，判断信号是否具有额外区分度。", label: "不自嗨" }
    ],
    screenshots: ["12-signal-quality-overview.png", "12-signal-quality-table.png", "12-signal-quality-chart.png"]
  },
  {
    id: "qqq",
    number: "14",
    category: "information",
    categoryLabel: "资讯与 AI",
    title: "QQQ 半量化决策台",
    route: "/futures",
    summary: "将指标、门控、逐 K 证据和复盘思路扩展到 QQQ / 纳斯达克代理数据，同时披露数据源和代理关系。",
    purpose: "验证研究方法在另一类市场数据上的适用性，但不把代理行情包装成可执行期货行情。",
    usage: ["选择日期和时间周期。", "查看 K 线、指标状态、信号方向和门控结果。", "检查每根 K 线的证据、来源和数据状态。", "结合风险提示进行研究，不执行真实下单。"],
    results: ["同一套研究方法可以扩展到另一类数据。", "实时、历史、缓存、代理和可执行性被明确拆开。"],
    tags: ["QQQ", "代理数据", "逐 K 证据", "数据披露"],
    features: [
      { name: "决策台总览", detail: "在选择的日期和周期内查看 K 线、指标方向和门控结果。", label: "方法迁移" },
      { name: "逐 K 证据", detail: "回到每根 K 线检查对应的指标和数据来源，不只看最终动作。", label: "证据回看" },
      { name: "来源状态", detail: "明确当前是实时、历史、缓存还是代理数据，提示不能执行真实交易。", label: "边界披露" }
    ],
    screenshots: ["21-qqq-overview.png", "21-qqq-evidence.png", "21-qqq-source-status.png"]
  },
  {
    id: "ai",
    number: "15",
    category: "information",
    categoryLabel: "资讯与 AI",
    title: "AI 研判",
    route: "/ai",
    summary: "将平台已有的行情、指标、复盘、估值、资讯和研报事实投影给模型，进行只读总结、比较和追问。",
    purpose: "模型负责整理和解释平台事实，原始数据、来源时间和缺失项仍然保留。",
    usage: ["选择股票解释、市场复盘、资讯总结或研报阅读等问题类型。", "确认使用自己的 BYOK，或使用经站长授权的共享模型。", "查看模型收到的事实范围、来源时间和研究对象。", "阅读带事实引用、限制和缺失项的结果，再继续追问。"],
    results: ["模型输出和原始事实分开。", "BYOK、共享模型和本机 Agent 路径隔离。", "普通问答、事实扫描和完整研究任务有不同边界。"],
    tags: ["事实投影", "BYOK", "Agent", "只读研究"],
    features: [
      { name: "问题类型", detail: "从当前股票解释、复盘、资讯总结和研报阅读进入对应研究上下文。", label: "上下文明确" },
      { name: "模型路径选择", detail: "区分用户自己的 BYOK、站长授权共享模型和本机 Agent，不隐式消耗其他额度。", label: "权限隔离" },
      { name: "事实依据", detail: "展示模型收到的事实范围、来源时间、引用和缺失项，避免回答脱离数据。", label: "证据可见" },
      { name: "研究任务", detail: "长任务以任务状态和结果记录呈现，普通问答不伪装成完整研究。", label: "任务可回看" }
    ],
    screenshots: ["22-ai-home.png", "22-ai-model-routing.png", "22-ai-evidence.png", "22-ai-research-task.png", "22-ai-mobile.png"]
  },
  {
    id: "providers",
    number: "16",
    category: "platform",
    categoryLabel: "平台与账号",
    title: "数据源状态",
    route: "/providers",
    summary: "展示 Futu OpenD、baostock、缓存和应用服务的连接、更新时间、能力与降级状态。",
    purpose: "把服务在线、目标字段可用、数据是否新鲜这三件事分开检查。",
    usage: ["查看各数据源节点是否在线。", "检查实时报价、历史 K 线、财务字段和资讯能力。", "对照更新时间和来源标签判断数据是实时、缓存还是回补。", "异常时进入详情查看降级原因。"],
    results: ["知道问题来自节点、字段、缓存还是外部来源。", "页面不会用一个绿色在线状态掩盖具体能力缺失。"],
    tags: ["数据源", "能力检查", "降级状态"],
    features: [
      { name: "节点状态", detail: "查看 Futu OpenD、历史回补和应用服务的连接状态与更新时间。", label: "连接检查" },
      { name: "能力详情", detail: "分开检查报价、K 线、财务和资讯等目标能力，避免节点在线等于所有请求可用。", label: "能力拆分" },
      { name: "降级原因", detail: "显示缓存过期、字段缺失、节点断开或外部来源失败等原因。", label: "失败可解释" }
    ],
    screenshots: ["23-data-status.png", "23-data-status-detail.png"]
  },
];

const moduleGroups = {
  core: "核心工作台",
  research: "研究分析",
  information: "资讯研报",
  tools: "工具"
};

const categoryLabels = {
  all: "全部入口",
  core: "核心工作台",
  research: "研究分析",
  value: "价值投资",
  information: "资讯研报",
  tools: "工具"
};

const showcaseAdditions = [
  {
    id: "peg",
    category: "value",
    categoryLabel: "价值投资",
    title: "PEG 估值",
    route: "/peg",
    summary: "把现价、PE、盈利增长、来源和适用性放在同一估值页面，明确缺失与不适用状态。",
    purpose: "让 PEG 成为一个有输入、有来源、有边界的估值辅助工具，而不是孤立的数字。",
    usage: ["从价值投资中心进入 PEG 估值。", "逐项确认现价、PE、增长率、来源和数据日期。", "查看计算结果、缺失字段和适用性提示。", "结合个股研究和其他证据，不把 PEG 单独当成结论。"],
    results: ["输入字段和计算依据可回看。", "负增长、字段缺失和来源异常不会被强行计算。"],
    tags: ["PE", "增长率", "估值边界", "字段校验"],
    features: [],
    screenshots: []
  },
  {
    id: "brief",
    category: "information",
    categoryLabel: "资讯研报",
    title: "市场简报",
    route: "/information/brief",
    summary: "把当天市场重点事实、指数、情绪和风险整理成开场阅读。",
    purpose: "让用户先获得市场背景，再决定进入复盘、工作台或单股研究。",
    usage: ["打开市场简报，先看当天重点事实。", "核对每条内容的来源、事实日期和状态。", "从条目继续进入复盘、资讯雷达或相关标的。"],
    results: ["减少开盘前后的信息分散。", "摘要保留来源与时间，不把摘要冒充完整事实。"],
    tags: ["开场阅读", "市场事实", "来源时间"],
    features: [],
    screenshots: []
  },
  {
    id: "radar",
    category: "information",
    categoryLabel: "资讯研报",
    title: "资讯雷达",
    route: "/information/radar",
    summary: "集中筛选新闻、公告和主题资讯，继续下钻到来源和原文。",
    purpose: "把需要进一步核验的信息线索从普通资讯流中筛出来。",
    usage: ["按来源、时间、主题和标的筛选。", "打开条目查看来源、发布时间和正文。", "将核验后的事实带入板块、个股或 AI 研究。"],
    results: ["信息发现和事实核验分开。", "资讯不会直接变成股票信号。"],
    tags: ["新闻", "公告", "主题筛选", "事实下钻"],
    features: [],
    screenshots: []
  },
  {
    id: "signals",
    category: "information",
    categoryLabel: "资讯研报",
    title: "产业信号",
    route: "/information/signals",
    summary: "整理 GPU 租金、产业数据、原材料和招聘等下游硬数据与相关资讯。",
    purpose: "为行业研究提供可核对的产业侧证据，不直接把产业信息变成个股信号。",
    usage: ["选择产业主题或数据类型。", "查看数值、时间、来源和相关资讯。", "结合板块、个股和估值页面继续研究。"],
    results: ["产业数据与普通新闻分开。", "数据日期和来源可以回看。"],
    tags: ["产业数据", "硬指标", "行业研究"],
    features: [],
    screenshots: []
  },
  {
    id: "hot",
    category: "information",
    categoryLabel: "资讯研报",
    title: "资讯榜单",
    route: "/information/hot",
    summary: "按热度和关注度浏览资讯排行，作为信息发现入口。",
    purpose: "帮助用户快速发现值得进一步核验的热点，但不把排名当成投资结论。",
    usage: ["查看当前资讯排行。", "从热点条目进入资讯雷达、产业信号或个股研究。", "回到原文和来源核对事实。"],
    results: ["热点发现更快。", "热度和事实结论保持边界。"],
    tags: ["热度", "排行", "线索发现"],
    features: [],
    screenshots: []
  },
  {
    id: "wire",
    category: "information",
    categoryLabel: "资讯研报",
    title: "实时动态",
    route: "/information/wire",
    summary: "按时间查看滚动更新的市场资讯和事件流，并显示时效状态。",
    purpose: "让用户知道刚刚发生了什么，同时知道信息是否仍然新鲜。",
    usage: ["按时间阅读最新动态。", "打开条目查看来源和详细内容。", "根据时效和可信度决定是否带入后续研究。"],
    results: ["滚动信息不与历史资料混淆。", "更新时间和来源状态一起展示。"],
    tags: ["滚动资讯", "时效", "事件流"],
    features: [],
    screenshots: []
  },
  {
    id: "research",
    category: "information",
    categoryLabel: "资讯研报",
    title: "研报中心",
    route: "/information/research",
    summary: "统一查看研报列表、PDF、解析正文、来源、时间和页码证据。",
    purpose: "让研报从文件列表变成可以搜索、定位、回看和继续研究的资料入口。",
    usage: ["筛选或搜索研报列表。", "打开 PDF 或解析正文，查看页码和原文定位。", "将相关事实带入个股、行业或 AI 只读分析。"],
    results: ["研报正文和来源可回看。", "模型摘要不会替代原文位置。"],
    tags: ["PDF", "正文解析", "页码证据", "研报 AI"],
    features: [],
    screenshots: []
  }
];

const showcaseOrder = [
  "workbench", "robot", "qqq", "review", "plates", "ranking", "screener", "ai", "alerts",
  "value", "peg", "brief", "radar", "signals", "hot", "wire", "research",
  "watchlist", "paper", "backtest", "quality", "providers"
];

const showcaseGroupById = {
  workbench: "core", robot: "core",
  qqq: "research", review: "research", plates: "research", ranking: "research", screener: "research", ai: "research", alerts: "research",
  value: "value", peg: "value",
  brief: "information", radar: "information", signals: "information", hot: "information", wire: "information", research: "information",
  watchlist: "tools", paper: "tools", backtest: "tools", quality: "tools", providers: "tools"
};

const showcaseScreenshotFiles = {
  workbench: ["01-workbench.png", "01-workbench-watchlists.png", "01-workbench-market-context.png", "01-workbench-shortcuts.png"],
  robot: ["02-robot-simple.png", "02-robot-professional.png", "02-robot-indicator-families.png", "02-robot-score-layers.png", "02-robot-manual-filters.png", "02-robot-timeframes.png", "02-robot-position-levels.png", "02-robot-snapshot.png"],
  qqq: ["03-qqq-overview.png", "03-qqq-evidence.png", "03-qqq-source-status.png"],
  review: ["04-review-dashboard.png", "04-review-emotion-cross-section.png", "04-review-money-effect.png", "04-review-market-data.png", "04-review-first-board.png", "04-review-five-day-heat.png", "04-review-sample-study.png", "04-review-ladder.png", "04-review-cycle.png", "04-review-verification.png", "04-review-auction.png", "04-review-evidence.png", "04-review-ai.png"],
  plates: ["05-plates-overview.png", "05-plates-fund-flow.png", "05-plates-constituents.png", "05-indices.png"],
  ranking: ["06-ranking.png", "06-ranking-signals.png"],
  screener: ["07-screener-conditions.png", "07-screener-combinations.png", "07-screener-results.png", "07-screener-explanation.png"],
  ai: ["08-ai-home.png", "08-ai-model-routing.png", "08-ai-evidence.png", "08-ai-research-task.png"],
  alerts: ["09-alerts-overview.png", "09-alerts-filters.png", "09-alert-detail.png", "09-alert-history.png"],
  value: ["10-value-research-overview.png", "10-value-research-evidence.png", "10-value-research-record.png"],
  peg: ["11-peg-inputs.png", "11-peg-result.png", "11-peg-limitations.png"],
  brief: ["12-market-brief.png", "12-market-brief-sources.png"],
  radar: ["13-information-radar.png", "13-information-radar-filters.png"],
  signals: ["14-industry-signals.png", "14-industry-signal-detail.png"],
  hot: ["15-information-hotrank.png", "15-information-hotrank-detail.png"],
  wire: ["16-information-wire.png", "16-information-wire-source.png"],
  research: ["17-research-list.png", "17-research-document.png", "17-research-ai-reading.png"],
  watchlist: ["18-watchlist-groups.png", "18-watchlist-edit.png", "18-watchlist-strategy.png"],
  paper: ["19-paper-account.png", "19-paper-order.png", "19-paper-positions.png"],
  backtest: ["20-backtest-form.png", "20-backtest-results.png", "20-backtest-trades.png", "20-backtest-audit.png"],
  quality: ["21-quality-overview.png", "21-quality-table.png", "21-quality-chart.png"],
  providers: ["22-data-status.png", "22-data-status-detail.png", "22-data-status-capabilities.png"]
};

const showcaseImplementation = {
  workbench: "前端工作台组合多个后端摘要接口，统一显示标的、市场上下文、更新时间和页面跳转状态。",
  robot: "Python 指标计算层输出结构化指标与信号快照，FastAPI 提供数据，ECharts 绘制 K 线和指标，前端再承载人工确认开关。公开材料只讲使用逻辑，不公开内部公式、权重、阈值和策略配方。",
  qqq: "独立的 QQQ 数据投影和只读决策页面，明确数据源、代理关系和不可执行边界，不复用股票订单适配器。",
  review: "复盘事实按交易日落盘到 SQLite，再由页面按标签页读取；统计、样本分组、验证和证据口径各自保留状态。",
  plates: "将板块、指数、成分股和资金趋势通过统一的结构化接口连接，页面按数据日期和样本范围呈现。",
  ranking: "后端返回排序和筛选后的结构化候选，前端负责维度切换、排序表达和进入详情的导航。",
  screener: "将筛选条件保存为可重复执行的规则组合，后端负责候选命中解释，前端负责条件编辑与结果联动。",
  ai: "先读取平台事实，再按问题做有界事实投影，模型路径和权限在服务端隔离，长任务使用可追踪状态。",
  alerts: "信号事件单独记录触发、确认、保持和结束时间，页面按股票、周期和方向组合筛选。",
  value: "将财务、业务、估值和研究命题组织为结构化事实与研究记录，结果保留来源和缺失项。",
  peg: "对 PEG 的输入字段、来源和适用性进行服务端校验，再由前端展示结果或明确限制状态。",
  brief: "将市场事实按交易日聚合成简报，页面保留事实日期、来源和可用状态。",
  radar: "资讯接入层按来源、时间、主题和标的建立可筛选索引，正文查看继续回到来源。",
  signals: "产业数据和资讯使用独立的数据模型与来源标记，避免将行业事实直接转换成个股推荐。",
  hot: "榜单使用独立排序结果作为信息发现入口，并保留从热度条目回到来源的路径。",
  wire: "实时动态按事件时间和来源更新，前端显示时效状态，避免滚动信息与历史资料混淆。",
  research: "研报文件、解析正文和原文定位分层保存，页面用列表、文档和 AI 阅读入口连接。",
  watchlist: "自选分组作为多个研究页面共享的输入池，账号状态持久化到数据库而不是只依赖浏览器。",
  paper: "模拟账户和订单使用独立的虚拟资金模型，与真实交易通道隔离。",
  backtest: "回测固定历史窗口和执行假设，结果、逐笔成交和覆盖审计互相链接。",
  quality: "对信号事件建立前向收益样本，并与无条件基准对照，避免只展示单个案例。",
  providers: "按具体数据能力检查节点、更新时间、缓存和降级原因，而不是只展示一个笼统在线状态。"
};

const modules = [...baseModules.filter((item) => !["information", "account"].includes(item.id)), ...showcaseAdditions]
  .sort((a, b) => showcaseOrder.indexOf(a.id) - showcaseOrder.indexOf(b.id))
  .flatMap((item, moduleIndex) => {
    const children = {
      workbench: [
        ["市场总览", "先看指数、成交、情绪和数据更新时间，决定今天进入哪个研究入口。", "打开工作台后先确认市场整体状态，再点击股票、板块、信号或资讯继续下钻。"],
        ["自选与持仓", "把高频观察对象固定在分组里，并作为异动、策略和机器人页面的输入池。", "切换自选或持仓分组，点击标的进入详情，也可以批量交给异动扫描。"],
        ["板块、指数与市场热度", "从市场整体结构观察板块轮动和情绪变化，避免只盯一只股票。", "先选择板块或指数，再进入板块中心、排行榜或单股机器人。"],
        ["工作台快捷研究", "把高频的复盘、机器人、AI 和验证入口放在日常首页。", "按当前阶段点击快捷入口，保留原页面的真实数据和状态。"]
      ],
      robot: [
        ["简化版阅读", "用一个清晰状态、当前周期、价格、关键价位和数据新鲜度快速判断。", "先看当前动作和风险，再决定是否切换专业版查看指标证据。"],
        ["专业版指标面板", "在 K 线和策略驾驶舱中同时查看趋势、动量、资金、结构和风险证据。", "从主图、指标图例和右侧策略驾驶舱依次阅读，不把单个指标当成最终结论。"],
        ["指标家族协同", "多个指标家族分别提供方向、动量、资金和趋势信息，再汇总成分层信号强度。", "先确认各家族是否同向，再观察支持度和冲突项；公开展示只说明层级，不公开内部公式和配方。"],
        ["分层评分与信号确认", "系统先把证据整理为基础方向，再叠加跨周期共振和风险门槛，输出候选、确认或观望状态。", "把评分当作证据强度而不是胜率；先看信号状态，再结合人工过滤决定是否继续研究。"],
        ["手动确认门槛", "O 趋势方向、VWAP 位置和量能等开关用于人工收紧或放宽入场确认，不直接制造信号。", "顺势或突破时可开启对应门槛；震荡或回踩场景按需要关闭，查看通过/拦截原因。"],
        ["多周期与关键价位", "对照分钟、小时、日线、周线和月线背景，并查看支撑、阻力、止损和数据来源。", "小周期用于观察动作，大周期用于确认背景；周期冲突时降低自动判断，回到风险计划。"],
        ["逐 K 信号快照", "每根已完成 K 线保留动作、评分、指标状态、风险和其他周期说明。", "点击快照行查看某个时点为什么出现该状态，为复盘和回测提供依据。"]
      ],
      qqq: [
        ["QQQ 决策台总览", "以 QQQ / 纳斯达克代理数据展示周期、方向、门控和风险状态。", "先选择日期和周期，再查看当前状态和数据来源。"],
        ["逐 K 证据", "按每根 K 线查看指标和门控结果，保留研究过程而不是只给最终标签。", "从总览下钻到单根 K 线，核对当时可见信息。"],
        ["数据源与代理边界", "明确实时、历史、缓存和代理关系，不把代理行情包装成可执行合约行情。", "研究前先看来源状态和限制说明，不用于真实下单。"]
      ],
      review: [
        ["复盘看板", "先看市场宽度、短线情绪横截面、昨日强势股反馈和今日盘面事实。", "打开复盘中心默认看板，先读总览，再进入下面的板块和梯队。"],
        ["短线情绪横截面", "把市场宽度、封板成功、昨日强势股反馈、接力成功和涨跌停强弱并列展示。", "看温度和五项分项，不把单日横截面直接当作情绪周期方向。"],
        ["赚钱效应与亏钱效应", "用昨日涨停样本观察今日平均、 中位数、红盘和再涨停等反馈，并把负反馈单独列出。", "先看样本数量和口径，再判断多数样本的体感，不能只看一个极值。"],
        ["盘面数据", "查看 A 股指数、隔夜外围和美股七姐妹，作为当天盘面的背景事实。", "逐项核对行情时间和来源，不把外围背景混进连板情绪评分。"],
        ["首板分析", "按首次封板时间查看股票、炸板、涨幅、成交额、流通市值和行业。", "用表格筛选和比较首板样本，必要时再交给 AI 分析公开驱动。"],
        ["五日热度", "观察近五个交易日涨停趋势、龙头去向、行业热度和跨日结构。", "先看热度轨迹，再看龙头谱系和行业矩阵，注意行业不等于涨停原因。"],
        ["涨停样本统计", "按封板时段、次日再板、晋级结果和历史成熟度拆分样本。", "看有效历史、分组分母和缺失状态；它是样本研究，不等同于收益回测。"],
        ["连板天梯与封板质量", "按板位查看晋级分子/分母、梯队断层、首次/最终封板、开板次数、封单和换手。", "从梯队卡片进入完整天梯，再按板位和封板质量比较。"],
        ["情绪周期与历史分位", "把当前情绪放进多日窗口，显示相对曲线、历史分位和关键指标。", "结合历史位置阅读当前阶段，不用单日分数替代周期判断。"],
        ["明日验证", "把当天观察写成下一交易日可核验的基线、方向和阈值。", "选择指标和比较方式保存，次日由系统自动回填满足、未满足或等待。"],
        ["竞价核验", "观察 09:25 竞价、分板位强弱和盘中六时点路径，缺失时点不补造。", "先确认采集状态，再切换观察维度和时间点，不把竞价观察当成交易建议。"],
        ["口径与证据", "展示来源覆盖、数据能力、计算口径、版本漂移和制度事件。", "遇到异常先进入这里，确认缺失是零、未知、未采集还是外部来源失败。"],
        ["页内 AI 复盘", "在事实之后生成可追问、可归档的只读复盘，不发送个人持仓。", "先看硬指标和来源，再点击生成或追问；数字由事实层校验。"]
      ],
      plates: [
        ["板块总览", "查看行业、概念板块的涨跌、成交、强弱和轮动状态。", "选择板块类型和排序，再进入资金或成分股。"],
        ["板块资金趋势", "将资金快照和分钟趋势放在同一研究上下文，保留日期和样本口径。", "先确认数据日期，再结合价格和成分股变化阅读。"],
        ["板块成分股", "从板块下钻到成分股，继续交给排行榜、策略选股或机器人。", "点击成分股名称或操作入口，保持研究上下文连续。"],
        ["指数中心", "对照主要指数走势、涨跌和市场背景。", "先看指数整体，再返回板块或单股判断局部强弱。"]
      ],
      ranking: [
        ["多维排行榜", "按涨幅、成交、估值、板块和指标状态快速发现候选。", "选择市场和排行维度，调整排序与数量。"],
        ["机器人信号排行", "按系统当前动作、趋势或风险状态缩小候选范围。", "从排行结果进入机器人，查看完整证据后再研究。"]
      ],
      screener: [
        ["条件编辑器", "将趋势、评分、指标、成交和板块条件组织成可保存规则。", "新建策略，添加条件并确认字段含义。"],
        ["组合逻辑", "用全部满足或任一满足表达不同研究假设。", "先选组合方式，再运行筛选，避免条件含义混淆。"],
        ["结果与命中解释", "展示候选数量、命中条件和下一步入口。", "点击候选进入机器人，检查筛选结果是否符合预期。"],
        ["策略保存与回测", "把筛选规则保留给后续重复运行，并连接综合评分回测。", "保存策略后从结果页进入回测，不需要重新手工录入。"]
      ],
      ai: [
        ["AI 研判首页", "从股票解释、市场复盘、资讯总结和研报阅读进入不同研究上下文。", "先选择问题类型和研究对象，再开始对话。"],
        ["模型路径选择", "区分 BYOK、站长授权共享模型和本机 Agent，保持额度与权限隔离。", "明确选择模型路径，查看当前账号可用范围。"],
        ["事实依据与限制", "展示模型收到的事实范围、来源时间、引用、缺失项和限制。", "先看事实投影，再阅读模型总结，不把生成文字当成原始行情。"],
        ["研究任务与追问", "将普通问答、事实扫描和完整研究任务分开，长任务显示状态和结果。", "需要更深研究时启动任务，完成后回看记录和证据。"]
      ],
      alerts: [
        ["异动总览", "集中查看当前有效、候选、确认和已结束的信号。", "先选扫描范围，再按信号状态和方向查看列表。"],
        ["异动筛选", "按自选、持仓、全部股票、周期、方向和指标缩小范围。", "组合筛选条件，区分候选信号和已确认信号。"],
        ["单股异动详情", "查看一只股票各周期的信号状态、首次触发和当前原因。", "从列表点击股票，再跳回机器人核对 K 线。"],
        ["生命周期历史", "保留信号触发、保持、撤回和结束时间。", "用历史记录回看信号是否持续，不只看最后一根 K 线。"]
      ],
      value: [
        ["个股研究", "从业务、财务、估值、行业和支持/反对证据形成个股研究命题。", "选择股票，先看结构化事实，再整理研究记录。"],
        ["基本面证据", "将财务字段、业务信息和同业比较放在可回看的证据链中。", "逐项查看来源、日期和缺失字段，避免把摘要当完整事实。"],
        ["研究结论", "保存研究命题、支持与反对证据和后续验证方向。", "完成一轮研究后保存，之后从记录中继续回看。"]
      ],
      peg: [
        ["PEG 输入字段", "展示现价、PE、增长率、来源和计算时间，先检查输入是否完整。", "进入 PEG 估值页，逐项确认输入和数据日期。"],
        ["PEG 结果", "在字段有效且适用时展示计算结果，并保留计算依据。", "将结果作为估值辅助，不单独替代基本面和市场判断。"],
        ["缺失与不适用", "区分负增长、字段缺失、来源过期和不适用场景。", "看到限制状态时先补数据或换研究方法，不强行解读数字。"]
      ],
      brief: [
        ["市场简报", "把当日市场重点事实、指数、情绪和风险整理成开场阅读。", "每天先看简报，再决定进入复盘、工作台或单股研究。"],
        ["来源与时间", "每条摘要保留来源、事实日期和可用状态。", "点击事实继续下钻，不把简报当成没有来源的结论。"]
      ],
      radar: [
        ["资讯筛选", "按来源、时间、主题和标的浏览新闻、公告和事件线索。", "使用筛选条件缩小信息范围，再打开正文。"],
        ["事实下钻", "从标题进入来源和原文信息，区分媒体摘要与平台事实。", "核对发布时间、来源和研究对象后再带入 AI。"]
      ],
      signals: [
        ["产业硬数据", "集中查看 GPU 租金、产业数据、原材料或招聘等下游信号。", "按产业主题进入，查看数据日期和来源。"],
        ["产业趋势", "把硬数据和相关资讯并列，用于辅助行业研究，不直接生成股票信号。", "先读数据，再结合板块和个股研究。"]
      ],
      hot: [
        ["资讯榜单", "按热度或关注度查看资讯排行，作为信息发现入口。", "先看榜单，再进入资讯正文和来源核验。"],
        ["榜单与研究联动", "从热点条目继续进入雷达、产业信号或个股研究。", "把热度当发现线索，不把排名当投资结论。"]
      ],
      wire: [
        ["实时动态", "查看滚动更新的市场资讯和事件流。", "按时间阅读最新动态，必要时打开原始来源。"],
        ["时效状态", "标记更新时点和来源可用状态，避免把旧动态当实时。", "先核对时间，再决定是否进入研究上下文。"]
      ],
      research: [
        ["研报列表", "统一查看研报标题、来源、时间、行业和处理状态。", "筛选或搜索研报，再打开文档。"],
        ["研报正文与页码证据", "支持 PDF / 解析正文查看，并保留页码或原文定位。", "阅读结论时回到原文位置，再将相关事实带入研究。"],
        ["研报 AI 阅读", "让模型基于已解析正文做摘要、比较和追问。", "先确认文档范围和来源，再启动只读分析。"]
      ],
      watchlist: [
        ["自选分组", "按持仓、主题、策略候选和长期关注对象建立分组。", "创建或切换分组，保持每组研究目的清楚。"],
        ["自选编辑", "添加、删除、排序股票并保存备注。", "编辑后返回工作台、机器人或异动中心继续使用。"],
        ["自选策略筛选", "将当前自选组作为策略和异动扫描的输入池。", "在分组内运行筛选，避免每次从全市场重新找。"]
      ],
      paper: [
        ["模拟账户", "提供虚拟资金、当前权益和账户状态。", "进入模拟页面查看账户，再进行一笔演练。"],
        ["模拟订单", "记录股票、方向、数量和价格，不连接真实交易接口。", "提交前确认标的和数量，提交后查看订单状态。"],
        ["持仓与盈亏", "查看持仓成本、浮动盈亏和已实现盈亏。", "结合机器人信号和回测结果复盘执行过程。"]
      ],
      backtest: [
        ["回测参数", "选择标的、周期、日期窗口、信号模式和持有期。", "先固定时间窗口和执行假设，再运行回测。"],
        ["结果与收益曲线", "查看收益、回撤、胜率、交易数量和同期持有对照。", "先看数据覆盖和风险，再看最终收益。"],
        ["逐笔成交", "把每笔入场、出场和状态关联回对应 K 线。", "点击交易明细核对当时信号和价格。"],
        ["数据覆盖与审计", "显示来源、时间范围、缺失和未平仓状态。", "发现覆盖不足时停止外推，不把缺失补成零。"]
      ],
      quality: [
        ["样本概览", "统计候选、确认和结束事件的样本数量与覆盖范围。", "先看样本量和时间窗口，再看收益统计。"],
        ["未来收益窗口", "对照信号后 5、10、20 根 K 线的表现分布。", "比较不同窗口，不用单个案例判断信号。"],
        ["基准对照", "与无条件基准比较信号是否具有额外区分度。", "结合样本量、分布和数据状态判断稳定性。"]
      ],
      providers: [
        ["数据源总览", "查看行情、历史、资讯、缓存和应用服务的连接状态。", "打开数据源页先看节点和更新时间。"],
        ["能力详情", "把实时报价、K 线、财务字段和资讯能力分别检查。", "不要把节点在线当成所有字段都可用。"],
        ["降级与恢复", "显示节点断开、字段缺失、缓存过期或外部来源失败。", "根据原因选择等待恢复、使用历史还是暂时停止判断。"]
      ]
    };
    const extraRows = {
      peg: [
        ["估值输入", "展示现价、PE、盈利增长、来源和计算时间，先确认输入是否完整。", "进入 PEG 页面逐项核对字段和数据日期。"],
        ["计算结果", "在字段有效且适用时展示结果，并保留计算依据。", "把结果作为估值辅助，继续结合个股研究。"],
        ["限制状态", "区分负增长、字段缺失、来源过期和不适用场景。", "看到限制时先补数据或换研究方法，不强行解读数字。"]
      ],
      brief: [
        ["市场重点", "把当日市场重点事实、指数、情绪和风险整理成开场阅读。", "每天先看简报，再决定进入复盘或单股研究。"],
        ["来源与时间", "每条摘要保留来源、事实日期和可用状态。", "点击事实继续下钻，不把摘要当成无来源结论。"]
      ],
      radar: [
        ["新闻与公告筛选", "按来源、时间、主题和标的浏览新闻、公告和事件线索。", "使用筛选条件缩小范围，再打开正文。"],
        ["资讯事实下钻", "从标题进入来源和原文信息，区分媒体摘要与平台事实。", "核对发布时间和来源后再带入 AI 或个股研究。"]
      ],
      signals: [
        ["产业硬数据", "集中查看 GPU 租金、原材料、招聘等下游数据。", "按产业主题进入，查看数据日期和来源。"],
        ["产业趋势关联", "把硬数据和相关资讯并列，用于行业研究，不直接生成股票信号。", "先读数据，再结合板块和个股研究。"]
      ],
      hot: [
        ["热点排行", "按热度或关注度查看资讯排行，作为信息发现入口。", "先看榜单，再进入资讯正文和来源核验。"],
        ["排行联动", "从热点条目继续进入雷达、产业信号或个股研究。", "把热度当发现线索，不把排名当投资结论。"]
      ],
      wire: [
        ["滚动事件流", "查看按时间更新的市场资讯和事件流。", "按时间阅读最新动态，必要时打开原始来源。"],
        ["时效状态", "标记更新时间和来源可用状态，避免把旧动态当实时。", "先核对时间，再决定是否进入研究上下文。"]
      ],
      research: [
        ["研报列表", "查看研报标题、来源、时间、行业和处理状态。", "筛选或搜索研报，再打开文档。"],
        ["研报正文", "打开 PDF 或解析正文，并保留页码或原文定位。", "阅读结论时回到原文位置，再带入研究。"],
        ["研报 AI 阅读", "让模型基于已解析正文做摘要、比较和追问。", "先确认文档范围和来源，再启动只读分析。"]
      ]
    };
    const rows = children[item.id] || extraRows[item.id];
    if (!rows && item.features.length) {
      return { ...item, group: showcaseGroupById[item.id] || "tools", category: showcaseGroupById[item.id] || "tools", categoryLabel: categoryLabels[showcaseGroupById[item.id] || "tools"], screenshots: showcaseScreenshotFiles[item.id] || item.screenshots, implementation: showcaseImplementation[item.id] || "页面将结构化数据呈现为可阅读的研究结果。" };
    }
    if (!rows) return item;
    const childFeatures = rows.map(([name, detail, usage], index) => ({
      name,
      detail: `${detail} 使用方式：${usage}`,
      label: index === 0 ? "页面入口" : index === rows.length - 1 ? "下钻结果" : "页面区域"
    }));
    const group = showcaseGroupById[item.id] || "tools";
    const normalized = item.id === "value"
      ? { ...item, title: "个股研究", route: "/value-investing", summary: "从业务、财务、估值、行业和支持/反对证据形成可回看的个股研究命题。", purpose: "先看结构化基本面事实，再把判断整理成有证据、有后续验证方向的研究记录。", tags: ["基本面", "行业比较", "研究命题", "证据链"] }
      : item;
    return {
      ...normalized,
      number: String(moduleIndex + 1).padStart(2, "0"),
      group,
      category: group,
      categoryLabel: categoryLabels[group],
      features: childFeatures,
      hierarchy: rows.map(([name, detail, usage]) => ({ name, detail, usage })),
      screenshots: showcaseScreenshotFiles[item.id] || normalized.screenshots,
      implementation: showcaseImplementation[item.id] || "页面将真实数据、状态和操作结果组织成可回看的研究界面。"
    };
  });

const moduleGrid = document.querySelector("#moduleGrid");
const detailContent = document.querySelector("#detailContent");
const resultCount = document.querySelector("#resultCount");
const emptyResults = document.querySelector("#emptyResults");
const searchInput = document.querySelector("#moduleSearch");
const expandAllButton = document.querySelector("#expandAll");
let currentFilter = "all";
let currentSearch = "";
let selectedId = modules[0].id;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function matchesModule(item) {
  const haystack = [
    item.title,
    item.summary,
    item.purpose,
    item.route,
    item.categoryLabel,
    ...item.tags,
    ...item.features.map((feature) => `${feature.name} ${feature.detail}`)
  ].join(" ").toLowerCase();
  return (currentFilter === "all" || item.category === currentFilter) && (!currentSearch || haystack.includes(currentSearch));
}

function moduleCardTemplate(item) {
  const tags = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  return `
    <article class="module-card${item.id === selectedId ? " is-selected" : ""}" data-module-id="${escapeHtml(item.id)}" tabindex="0">
      <div class="module-card-top"><span class="module-number">${escapeHtml(item.number)} / 22</span><span class="category-label">${escapeHtml(item.categoryLabel)}</span></div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.summary)}</p>
      <div class="tag-list">${tags}</div>
      <div class="module-card-bottom"><small>${item.features.length} 个子功能 · ${item.screenshots.length} 个截图位</small><button type="button" data-open-module="${escapeHtml(item.id)}">查看详情 →</button></div>
    </article>`;
}

function screenshotTemplate(file, title) {
  const safeFile = escapeHtml(file);
  return `
    <figure class="screenshot-slot" data-screenshot-file="${safeFile}">
      <div class="screenshot-preview">
        <img src="screenshots/${safeFile}" alt="${escapeHtml(title)}：${safeFile}" loading="lazy" />
        <div class="screenshot-placeholder"><strong>待补真实截图</strong><span>screenshots/${safeFile}</span></div>
      </div>
      <figcaption class="screenshot-caption"><span>${safeFile}</span><small class="pending-label">待放图</small></figcaption>
    </figure>`;
}

function renderModules() {
  const visible = modules.filter(matchesModule);
  moduleGrid.innerHTML = visible.map(moduleCardTemplate).join("");
  resultCount.textContent = currentSearch || currentFilter !== "all"
    ? `显示 ${visible.length} / ${modules.length} 个产品入口`
    : `显示 ${modules.length} 个产品入口`;
  emptyResults.hidden = visible.length !== 0;

  moduleGrid.querySelectorAll("[data-module-id]").forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      selectModule(card.dataset.moduleId, true);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectModule(card.dataset.moduleId, true);
      }
    });
  });
  moduleGrid.querySelectorAll("[data-open-module]").forEach((button) => {
    button.addEventListener("click", () => selectModule(button.dataset.openModule, true));
  });
}

function detailTemplate(item) {
  const usage = item.usage.map((step) => `<li>${escapeHtml(step)}</li>`).join("");
  const results = item.results.map((result) => `<li>${escapeHtml(result)}</li>`).join("");
  const hierarchy = (item.hierarchy || item.features.map((feature) => ({ name: feature.name, detail: feature.detail, usage: "按页面提示操作" }))).map((node, index) => {
    const screenshot = item.screenshots[index] || item.screenshots[item.screenshots.length - 1] || "待补截图文件名";
    return `
      <div class="hierarchy-row">
        <div class="hierarchy-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="hierarchy-copy"><span class="hierarchy-path">${escapeHtml(item.title)} / 页面区域</span><strong>${escapeHtml(node.name)}</strong><p>${escapeHtml(node.detail)}</p><small><b>使用：</b>${escapeHtml(node.usage)}</small></div>
        <code class="hierarchy-shot">${escapeHtml(screenshot)}</code>
      </div>`;
  }).join("");
  const features = item.features.map((feature) => `
    <div class="feature-row">
      <div class="feature-row-top"><strong>${escapeHtml(feature.name)}</strong><em>${escapeHtml(feature.label)}</em></div>
      <p>${escapeHtml(feature.detail)}</p>
    </div>`).join("");
  const screenshots = item.screenshots.map((file) => screenshotTemplate(file, item.title)).join("");
  const tags = item.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  return `
    <div class="detail-content">
      <div class="detail-header">
        <div><span class="module-number">${escapeHtml(item.number)} / 22 · ${escapeHtml(item.categoryLabel)}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.purpose)}</p></div>
        <span class="detail-route">${escapeHtml(item.route)}</span>
      </div>
      <div class="detail-meta"><span><b>功能：</b>${item.features.length} 个子功能</span><span><b>截图：</b>${item.screenshots.length} 个预留位</span><span><b>标签：</b>${tags}</span></div>
      <section class="hierarchy-section"><div class="subsection-heading"><div><span class="section-kicker">NESTED PRODUCT MAP</span><h4>页面层级与最小功能</h4></div><p>模块 → 页面 / 标签 → 区域 → 子功能 → 截图</p></div><div class="hierarchy-list">${hierarchy}</div></section>
      <div class="detail-columns">
        <div>
          <div class="detail-block"><h4>怎么用</h4><ol class="steps-list">${usage}</ol></div>
          <div class="detail-block"><h4>使用效果</h4><ul class="result-list">${results}</ul></div>
        </div>
        <div class="detail-block"><h4>工程实现说明</h4><p class="implementation-copy">${escapeHtml(item.implementation || "页面将真实数据、状态和操作结果组织成可回看的研究界面。")}</p><div class="feature-list feature-list--compact">${features}</div></div>
      </div>
      <div class="screenshots-section"><div class="screenshots-heading"><h4>界面截图</h4><p>把同名真实图片放进 screenshots/ 后自动替换占位。</p></div><div class="screenshot-grid">${screenshots}</div></div>
    </div>`;
}

function bindScreenshotFallbacks() {
  detailContent.querySelectorAll(".screenshot-slot img").forEach((image) => {
    const slot = image.closest(".screenshot-slot");
    image.addEventListener("load", () => slot.classList.add("has-image"));
    image.addEventListener("error", () => slot.classList.remove("has-image"));
  });
}

function selectModule(id, shouldScroll = false) {
  const item = modules.find((module) => module.id === id);
  if (!item) return;
  selectedId = id;
  detailContent.innerHTML = detailTemplate(item);
  bindScreenshotFallbacks();
  renderModules();
  if (shouldScroll) document.querySelector("#detail").scrollIntoView({ behavior: "smooth", block: "start" });
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderModules();
  });
});

searchInput.addEventListener("input", () => {
  currentSearch = searchInput.value.trim().toLowerCase();
  renderModules();
});

expandAllButton.addEventListener("click", () => {
  const visible = modules.filter(matchesModule);
  if (!visible.length) return;
  detailContent.innerHTML = visible.map((item) => detailTemplate(item)).join("");
  bindScreenshotFallbacks();
  document.querySelector("#detail").scrollIntoView({ behavior: "smooth", block: "start" });
});

selectModule(selectedId);
