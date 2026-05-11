let currentTag = 'all';
let currentRiskLevel = 'all';
let searchQuery = '';
let currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initChecklist();
    initDictionary();
    initCases();
    initScrollAnimation();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });
    
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

const privacyChecklist = [
  {
    id: "data-collection",
    category: "数据收集范围",
    shortTitle: "它收集了什么？",
    description: "检查平台在注册、浏览、下单、售后、安全保障、互动分享等场景中，会收集哪些个人信息，以及是否涉及敏感个人信息或设备权限。",
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>',
    items: [
      {
        id: "data-001",
        question: "是否收集手机号用于注册、登录或账号绑定？",
        riskLevel: "低关注",
        scene: "注册及登录",
        detail: "拼多多隐私政策中说明，用户使用手机号注册时，会通过短信验证码验证身份；使用本机号码一键登录时，会在用户同意后使用通信运营商提供的功能。",
        whyItMatters: "手机号属于常见账号识别信息，电商平台用于注册登录通常具有合理性，但用户需要知道它是否还会被用于商业短信、账号安全核验或其他推广触达。",
        userTip: "阅读时重点看：手机号除了注册登录，是否还会用于商业短信、账号安全核验或其他推广触达。"
      },
      {
        id: "data-002",
        question: "是否通过微信、QQ 等第三方账号登录并获取头像、昵称等信息？",
        riskLevel: "中关注",
        scene: "第三方账号登录",
        detail: "政策提到，用户使用微信、QQ 等第三方账户登录时，平台会根据授权获取第三方账户信息，包括头像、昵称以及授权页面显示的其他信息。",
        whyItMatters: "第三方登录会形成平台账号与外部账号之间的数据连接，用户需要关注授权范围是否清楚。",
        userTip: "登录前可以查看第三方授权页面，确认平台获取的是哪些信息，避免默认授权过多信息。"
      },
      {
        id: "data-003",
        question: "是否在账号找回、手机号换绑等场景收集身份证件信息或面部信息？",
        riskLevel: "高关注",
        scene: "实名认证 / 账号安全",
        detail: "政策提到，在账号找回、手机号换绑等场景，为保障账户安全，用户可能需要提交身份证件信息及/或面部信息完成实名认证。",
        whyItMatters: "身份证件信息和面部信息通常属于敏感个人信息，一旦泄露或被滥用，可能对用户身份安全和财产安全产生较大影响。",
        userTip: "重点看平台是否说明收集场景、必要性、保存期限，保护措施，以及是否仅在特定安全场景下触发。"
      },
      {
        id: "data-004",
        question: "是否收集搜索记录、浏览历史、收藏记录、关注关系等行为日志？",
        riskLevel: "中关注",
        scene: "商品展示与内容推荐",
        detail: "政策提到，用户在访问或使用平台时，平台可能收集搜索记录、浏览历史、收藏记录、关注关系等日志信息，用于实现相关功能及明确告知的目的。",
        whyItMatters: "行为日志可以反映用户兴趣、消费偏好和生活习惯，常被用于推荐、排序、营销和用户画像。",
        userTip: "重点看这些行为数据是否会被用于个性化推荐、广告投放或商业短信。"
      },
      {
        id: "data-005",
        question: "是否收集订单信息，包括收货人姓名、地址、手机号、商品信息、金额、支付方式等？",
        riskLevel: "中关注",
        scene: "交易及售后",
        detail: "用户下单时，订单信息可能包括收货人姓名或名称、收货地址、收货手机号、订单编号、商品信息、下单时间、优惠信息、支付金额和支付方式等。",
        whyItMatters: "订单信息能反映用户消费习惯、地址、联系方式和交易金额，是电商平台最核心的数据类型之一。",
        userTip: "重点看订单信息会被用于哪些目的，例如配送、售后、发票、税务申报、交易安全判断等。"
      },
      {
        id: "data-006",
        question: "是否在跨境商品交易中要求提供身份证件信息用于清关？",
        riskLevel: "高关注",
        scene: "跨境电商交易",
        detail: "政策提到，部分商品或服务根据特点和法律法规要求，可能需要提供其他必要信息，例如涉及跨境交易时需要提供身份证件信息以完成清关。",
        whyItMatters: "身份证件信息属于敏感信息，跨境交易场景还可能涉及海关、物流、商家等多方处理。",
        userTip: "购买跨境商品前，要重点看身份证件信息提供给谁、用于什么、是否仅限清关、保存多久。"
      },
      {
        id: "data-007",
        question: "是否收集客服沟通记录、通信/通话记录、投诉材料或售后证明信息？",
        riskLevel: "中关注",
        scene: "客服与售后",
        detail: "政策提到，为联系用户、记录和解决问题、评估售后服务质量，平台可能保存沟通、通信/通话记录及相关内容。",
        whyItMatters: "客服材料中可能包含订单、地址、身份证明、图片、聊天记录等较多个人信息。",
        userTip: "提交售后材料时，尽量只提供解决问题所必要的信息，不要上传无关身份证明或隐私图片。"
      },
      {
        id: "data-008",
        question: "是否收集设备信息、应用列表、设备标识符、网络环境和传感器信息用于安全风控？",
        riskLevel: "高关注",
        scene: "账户及交易安全",
        detail: "政策提到，为保障账户和交易安全，平台可能获取账户信息、交易信息、设备信息、日志信息，以及应用列表、设备标识符、网络环境、传感器信息等。",
        whyItMatters: "设备信息和传感器信息较为敏感，可能用于识别设备、判断异常行为，也可能影响用户画像和风险评分。",
        userTip: "重点看这些信息的收集目的是否限定在安全风控范围内，以及是否说明具体类型和使用边界。"
      },
      {
        id: "data-009",
        question: "是否在用户发布评价、图文、视频、评论时公开展示头像、昵称或内容？",
        riskLevel: "中关注",
        scene: "评价、评论与内容发布",
        detail: "政策提到，用户发布评价、评论、图文或视频时，头像、昵称、评论内容或发布内容可能会公开展示。",
        whyItMatters: "公开发布的信息可能包含个人信息甚至敏感个人信息，一旦公开，传播范围较难控制。",
        userTip: "发布评价、晒单或视频时，不要露出真实姓名、地址、手机号、订单号、儿童照片等信息。"
      },
      {
        id: "data-010",
        question: "是否读取通讯录、剪贴板、相册、摄像头、麦克风、位置等系统权限？",
        riskLevel: "高关注",
        scene: "系统权限与附加服务",
        detail: "政策及权限申请清单提到，平台可能在相关场景申请位置、摄像头、相册、麦克风、通讯录、剪贴板等权限。",
        whyItMatters: "系统权限往往涉及较高隐私敏感度，尤其是通讯录、精准位置、相册、麦克风、摄像头等。",
        userTip: "只在需要使用对应功能时开启权限，用完后可以在系统设置或 App 权限管理中关闭。"
      }
    ]
  },
  {
    id: "purpose-necessity",
    category: "使用目的与必要性",
    shortTitle: "它为什么收集？",
    description: "检查平台是否说明每类个人信息的使用目的，以及收集范围是否与注册登录、商品展示、交易售后、安全保障等功能相匹配。",
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
    items: [
      {
        id: "purpose-001",
        question: "是否区分基本功能和附加功能所需的信息？",
        riskLevel: "低关注",
        scene: "功能区分",
        detail: "政策中将基本功能概括为注册及登录、展示商品/服务、交易及售后、保障账户及交易安全等，并说明附加功能处理非必要个人信息时会单独征求同意。",
        whyItMatters: "区分基本功能和附加功能，有助于用户判断哪些信息是必须提供，哪些信息可以拒绝。",
        userTip: "阅读时重点看：拒绝提供某类信息后，是无法使用核心服务，还是只影响附加体验。"
      },
      {
        id: "purpose-002",
        question: "是否说明不提供某些信息会造成什么影响？",
        riskLevel: "中关注",
        scene: "拒绝提供信息的后果",
        detail: "政策对部分场景说明了不提供信息的影响，例如不提供注册登录信息将无法注册或登录，但仍可浏览或搜索商品。",
        whyItMatters: "用户需要知道自己拒绝授权后，究竟是不能使用全部服务，还是仅不能使用某项功能。",
        userTip: "如果政策没有说明拒绝后的影响，用户很难作出真实，自由的选择。"
      },
      {
        id: "purpose-003",
        question: "是否将订单信息用于身份核验、交易确认、支付结算、配送、发票、税务、客服与交易安全判断？",
        riskLevel: "中关注",
        scene: "订单信息使用",
        detail: "政策提到，订单信息可能用于身份核验、确定交易、支付结算、完成配送、发票开具、税务申报、查询订单、客服售后和异常交易判断。",
        whyItMatters: "订单信息使用场景较多，用户需要判断这些用途是否与电商交易履约相关。",
        userTip: "重点看平台是否把订单信息进一步用于营销推荐、画像分析或第三方广告。"
      },
      {
        id: "purpose-004",
        question: "是否将设备信息、日志信息用于账户安全、交易安全和反欺诈？",
        riskLevel: "中关注",
        scene: "安全风控",
        detail: "政策说明，平台可能使用账户信息、交易信息、设备信息、日志信息等来判断账户及交易风险、验证身份、检测和防范安全事件。",
        whyItMatters: "安全风控有正当性，但设备信息范围较广时，仍需要关注是否超出必要范围。",
        userTip: "可以把这类条款作为重点阅读对象，尤其看是否列明具体设备信息类型。"
      },
      {
        id: "purpose-005",
        question: "是否将用户行为数据用于优惠提醒、降价提示、商家上新提示等商业触达？",
        riskLevel: "中关注",
        scene: "商业触达",
        detail: "政策提到，搜索记录、浏览历史、收藏记录、关注关系等日志信息可能用于优惠/降价信息提示、商家上新提示等目的。",
        whyItMatters: "这类用途与用户体验有关，但也可能增加商业推送频率。",
        userTip: "重点看是否提供关闭消息通知、短信或个性化推荐的入口。"
      },
      {
        id: "purpose-006",
        question: "是否将剪贴板用于识别口令、分享码、链接等跳转或活动联动指令？",
        riskLevel: "高关注",
        scene: "分享与活动联动",
        detail: "政策提到，在分享或接收被分享信息、参加活动等情形下，平台需要在本地访问剪贴板，读取其中包含的口令、分享码、链接，以实现跳转、分享、活动联动等功能。",
        whyItMatters: "剪贴板中可能存在验证码、地址、账号、其他 App 内容等隐私信息，因此读取剪贴板属于用户较敏感的感知点。",
        userTip: "重点看平台是否说明仅在本地识别、什么情况下上传服务器，以及是否读取非平台相关内容。"
      },
      {
        id: "purpose-007",
        question: "是否将通讯录或手机号关系用于好友推荐或社交互动？",
        riskLevel: "高关注",
        scene: "好友互动",
        detail: "政策提到，用户授权读取通讯录后，可添加通讯录好友；平台也可能根据互动行为以及用户授权的手机号、通讯录等关系进行好友推荐或将用户推荐给相应用户。",
        whyItMatters: "通讯录不仅涉及用户本人，还涉及通讯录中其他人的个人信息。",
        userTip: "如果只是购物需求，通常不必开启通讯录权限；使用社交互动功能时再考虑授权。"
      }
    ]
  },
  {
    id: "third-party-sharing",
    category: "第三方共享与委托处理",
    shortTitle: "它会给谁？",
    description: "检查平台是否向支付机构、商家、物流主体、关联公司、广告分析服务商、SDK 提供方等第三方共享或委托处理个人信息。",
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>',
    items: [
      {
        id: "sharing-001",
        question: "是否向第三方支付机构提供订单编号、交易金额等支付信息？",
        riskLevel: "低关注",
        scene: "支付",
        detail: "政策提到，用户下单后，平台需要将订单编号、交易金额以及其他支付和法律要求的必要信息提供给用户选择的支付机构，以完成支付。",
        whyItMatters: "向支付机构提供必要支付信息通常是完成交易所必需的，但用户仍应知道信息接收方是谁。",
        userTip: "重点看支付机构名称、共享信息类型、共享目的和共享方式是否明确。"
      },
      {
        id: "sharing-002",
        question: "是否向商家提供收货人姓名、地址、手机号等订单信息？",
        riskLevel: "中关注",
        scene: "交易履约",
        detail: "信息共享清单中显示，为完成交易履约、售后服务与沟通，订单信息可能提供给拼多多综合服务平台内商家。",
        whyItMatters: "商家会直接接触收货信息，用户需要关注商家是否为独立处理者，以及商家自身规则是否另行适用。",
        userTip: "购买前可查看商家主体信息；如果加入商家会员，需要另看商家的个人信息处理规则。"
      },
      {
        id: "sharing-003",
        question: "是否向物流配送主体提供收货人姓名、地址、手机号等配送信息？",
        riskLevel: "低关注",
        scene: "物流配送",
        detail: "政策提到，商家、物流配送主体或其他物流服务提供主体可能使用收货人姓名、收货地址、收货手机号及其他配送必要信息，以完成商品或服务交付。",
        whyItMatters: "物流共享通常是电商履约必要环节，但配送信息具有较强现实识别性。",
        userTip: "用户可关注快递面单隐私保护、号码保护、虚拟号等功能是否可用。"
      },
      {
        id: "sharing-004",
        question: "是否与关联公司共享个人信息？",
        riskLevel: "中关注",
        scene: "关联公司共享",
        detail: "政策提到，为便于关联公司提供部分服务、展示可能感兴趣的内容，保护账号与交易安全等，个人信息可能与关联公司共享。",
        whyItMatters: "关联公司共享可能扩大信息流转范围，用户需要关注共享目的、共享范围和是否有明确边界。",
        userTip: "重点看关联公司共享是否列明具体目的、信息类型和保护措施。"
      },
      {
        id: "sharing-005",
        question: "是否委托广告、分析服务类合作伙伴处理广告覆盖面和有效性相关信息？",
        riskLevel: "高关注",
        scene: "广告与数据分析",
        detail: "政策提到，平台会委托广告、分析服务类合作伙伴处理与广告覆盖面和有效性相关的信息，并可能进行去标识化处理。",
        whyItMatters: "广告分析可能涉及设备信息、行为数据、兴趣偏好等，用户需要关注是否用于精准营销或跨平台广告。",
        userTip: "重点看是否提供个性化广告管理入口，以及是否说明合作伙伴类型和处理边界。"
      },
      {
        id: "sharing-006",
        question: "是否嵌入第三方 SDK，并说明 SDK 名称、运营方、用途、处理信息类型和隐私政策链接？",
        riskLevel: "高关注",
        scene: "第三方 SDK",
        detail: "政策提到，平台应用中会嵌入第三方 SDK 或类似应用程序，并提供第三方 SDK 目录说明相关个人信息处理情况。",
        whyItMatters: "SDK 可能直接在本机采集设备信息，例如 Android ID、MAC 地址、IDFA 等。用户不一定能直观看到 SDK 的数据处理行为。",
        userTip: "重点看 SDK 目录是否包括 SDK 名称、运营方、用途、处理信息类型、处理方式和官网/隐私政策链接。"
      },
      {
        id: "sharing-007",
        question: "是否说明在合并、分立、解散、破产等交易中可能转让个人信息？",
        riskLevel: "中关注",
        scene: "个人信息转让",
        detail: "政策提到，涉及合并、分立、解散、破产或类似交易需要转移个人信息时，会告知接收方名称或姓名和联系方式。",
        whyItMatters: "公司结构变化可能导致个人信息控制方发生变化。",
        userTip: "重点看接收方是否继续受原隐私政策约束，以及变更处理目的、方式时是否重新征求同意。"
      },
      {
        id: "sharing-008",
        question: "是否说明公开披露个人信息的例外情形？",
        riskLevel: "中关注",
        scene: "公开披露",
        detail: "政策提到，平台不会将个人信息披露给无关第三方或公之于众，但在获得单独同意、法律法规要求、行政司法要求、严重违规等情形下可能披露。",
        whyItMatters: "公开披露影响较大，用户需要知道哪些情况下信息可能被公开。",
        userTip: "重点看是否以单独同意、主动选择或法定要求作为公开披露前提。"
      }
    ]
  },
  {
    id: "recommendation-marketing",
    category: "个性化推荐与广告营销",
    shortTitle: "它会怎么影响你？",
    description: "检查平台是否基于用户行为、订单、偏好特征进行推荐、排序、广告展示、商业短信发送，以及是否提供关闭或管理方式。",
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
    items: [
      {
        id: "marketing-001",
        question: "是否根据搜索、浏览、收藏、关注、订单等信息提取偏好特征？",
        riskLevel: "高关注",
        scene: "用户画像与偏好分析",
        detail: "政策提到，平台可能根据用户设备信息、日志信息及其他授权信息，例如订单信息，提取用户偏好特征。",
        whyItMatters: "偏好特征可能用于判断用户兴趣、消费能力、购物习惯，从而影响展示内容和营销触达。",
        userTip: "重点看偏好特征会用于哪些场景，是否仅用于商品推荐，还是也用于广告或商业短信。"
      },
      {
        id: "marketing-002",
        question: "是否基于偏好特征推荐商品、服务或其他信息？",
        riskLevel: "中关注",
        scene: "个性化内容推荐",
        detail: "政策提到，平台可能基于用户偏好特征推荐用户可能感兴趣的商品、服务或其他信息。",
        whyItMatters: "个性化推荐可能提升体验，但也会造成信息茧房或过度商业化推送。",
        userTip: "用户可以查看是否有个性化推荐管理入口，并尝试关闭或减少类似推荐。"
      },
      {
        id: "marketing-003",
        question: "是否根据用户特征对商品、服务或信息进行排序？",
        riskLevel: "中关注",
        scene: "搜索排序与展示排序",
        detail: "政策提到，平台可能对向用户展示的商品、服务或其他信息进行排序，同时提供按销量、好友拼过，品牌等维度调整排序或筛选的方式。",
        whyItMatters: "排序会影响用户看到什么、先看到什么，进而影响消费决策。",
        userTip: "用户可以尝试使用非个性化排序、筛选条件或价格区间等方式减少推荐影响。"
      },
      {
        id: "marketing-004",
        question: "是否通过注册手机号、收货手机号发送商业性短信？",
        riskLevel: "高关注",
        scene: "商业短信",
        detail: "政策提到，平台可能通过注册手机号、收货手机号等联系方式发送商业性短信息。",
        whyItMatters: "商业短信直接使用联系方式进行营销触达，用户需要知道是否默认开启以及如何退订。",
        userTip: "重点看是否提供短信退订方式，以及是否能在 App 中关闭优惠活动短信。"
      },
      {
        id: "marketing-005",
        question: "商业性短信息是否默认开启？",
        riskLevel: "高关注",
        scene: "营销默认设置",
        detail: "政策提到，为便于用户接收相关信息，商业性短信息的发送将默认开启。",
        whyItMatters: "默认开启营销短信会影响用户选择权和安宁权益，是非常适合放入风险提示的重点。",
        userTip: "可以通过短信退订方式，或在 App 的消息接收设置中关闭优惠活动短信。"
      },
      {
        id: "marketing-006",
        question: "是否提供关闭个性化内容推荐的方式？",
        riskLevel: "低关注",
        scene: "推荐关闭入口",
        detail: "政策提到，用户可以通过长按被推荐商品或服务图片选择减少或屏蔽类似内容，也可以在 App 中关闭个性化内容推荐。",
        whyItMatters: "提供关闭入口有助于用户控制个性化推荐。",
        userTip: "页面中可以把关闭路径做成用户提示卡片，帮助用户找到设置入口。"
      },
      {
        id: "marketing-007",
        question: "是否提供个性化广告管理入口？",
        riskLevel: "低关注",
        scene: "广告管理",
        detail: "政策提到，用户可以在 App 中管理系统展示的个性化广告或通过第三方应用程序推送的广告。",
        whyItMatters: "广告管理入口可以帮助用户减少基于个人特征的广告展示。",
        userTip: "用户可进入个性化广告管理页面，查看是否可以关闭或调整广告推荐。"
      },
      {
        id: "marketing-008",
        question: "是否使用 Cookie、匿名标识符或网络 beacon 展示感兴趣的信息或优化广告互动？",
        riskLevel: "中关注",
        scene: "Cookie 与类似技术",
        detail: "政策提到，平台可能使用 Cookie、匿名标识符、网络 beacon 等技术，用于保障服务运转、了解使用习惯、判断账户安全，也可能用于展示感兴趣的信息、优化广告选择与互动。",
        whyItMatters: "Cookie 和类似技术可能持续记录用户访问和使用行为。",
        userTip: "用户可以通过浏览器清除缓存数据、修改 Cookie 接受程度或拒绝 Cookie，但可能影响部分功能。"
      }
    ]
  },
  {
    id: "storage-crossborder",
    category: "跨境传输与数据存储",
    shortTitle: "它会存在哪里？",
    description: "检查平台是否说明个人信息存储地点、保存期限、删除或匿名化处理方式，以及跨境交易或法定情形下的信息出境安排。",
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
    items: [
      {
        id: "storage-001",
        question: "是否说明个人信息存储地点？",
        riskLevel: "低关注",
        scene: "存储地点",
        detail: "政策说明，用户个人信息将全部存储于中华人民共和国境内，但法律法规另有规定、获得单独同意、跨境电子商务交易及其他合同履行所必需的情形除外。",
        whyItMatters: "存储地点关系到适用法律、监管要求和数据保护标准。",
        userTip: "重点看是否存在境外存储或境外接收方，以及是否说明例外情形。"
      },
      {
        id: "storage-002",
        question: "是否说明哪些情况下个人信息可能出境？",
        riskLevel: "高关注",
        scene: "个人信息出境",
        detail: "政策列明了个人信息存储在境内的例外，包括法律法规另有规定、获得单独同意、跨境电子商务交易及其他类型合同订立和履行所必需。",
        whyItMatters: "跨境场景可能涉及境外商家、物流、清关、支付或其他服务方，数据流转链条更复杂。",
        userTip: "购买跨境商品时，重点看身份证件信息、收货信息、订单信息是否会被提供给境外相关方或清关服务方。"
      },
      {
        id: "storage-003",
        question: "是否说明个人信息保存期限？",
        riskLevel: "中关注",
        scene: "保存期限",
        detail: "政策提到，平台只会在达成本政策所述目的所需期限内保留个人信息，除非需要延长保留期或法律法规允许或要求。",
        whyItMatters: "保存期限越长，潜在泄露或被二次使用的风险越高。",
        userTip: "重点看平台是否仅说「必要期限」，还是进一步说明不同信息类型的具体保存期限。"
      },
      {
        id: "storage-004",
        question: "是否说明交易信息依法至少保存三年？",
        riskLevel: "低关注",
        scene: "电商交易记录保存",
        detail: "政策提到，根据《电子商务法》，商品和服务信息、交易信息保存时间自交易完成之日起不少于三年。",
        whyItMatters: "电商交易信息长期保存有法定依据，但用户需要理解删除订单记录不一定等于后台立即删除全部交易信息。",
        userTip: "用户删除前台订单记录后，仍应注意法律要求保存的信息可能继续留存。"
      },
      {
        id: "storage-005",
        question: "是否说明超出保存期限后会删除或匿名化处理？",
        riskLevel: "低关注",
        scene: "删除与匿名化",
        detail: "政策提到，在超出保存期间后，平台会根据适用法律要求删除个人信息或进行匿名化处理。",
        whyItMatters: "删除或匿名化是降低长期隐私风险的重要措施。",
        userTip: "重点看是否说明触发删除或匿名化的具体条件。"
      },
      {
        id: "storage-006",
        question: "是否说明备份系统中的信息无法立即删除，但会限制进一步处理？",
        riskLevel: "中关注",
        scene: "备份系统",
        detail: "政策提到，用户或平台协助删除相关信息后，因法律和安全技术限制，可能无法立即从备份系统中删除相应信息，但会安全保存并限制进一步处理，直到备份可以清除或实现匿名化。",
        whyItMatters: "很多用户以为点击删除后所有系统中立即消失，但备份系统通常存在延迟删除。",
        userTip: "页面可以提示用户：删除请求生效和备份系统清除之间可能存在时间差。"
      },
      {
        id: "storage-007",
        question: "是否说明个人信息安全保护措施，例如加密、访问控制、安全培训、应急预案等？",
        riskLevel: "低关注",
        scene: "安全保护",
        detail: "政策提到，平台会使用 SSL、https、安全机制、加密技术、访问控制、安全管理制度、应急预案、专职小组等措施保护个人信息。",
        whyItMatters: "安全措施说明可以帮助用户判断平台是否对个人信息安全进行基本保护。",
        userTip: "阅读时可关注是否只写原则性表述，还是列明了具体技术和管理措施。"
      },
      {
        id: "storage-008",
        question: "发生个人信息安全事件时，是否说明会通知用户并上报监管部门？",
        riskLevel: "中关注",
        scene: "安全事件通知",
        detail: "政策提到，如发生个人信息安全事件，将按照法律法规要求告知用户事件基本情况、影响、处置措施、防范建议和补救措施，并按监管部门要求上报。",
        whyItMatters: "安全事件通知机制关系到用户能否及时采取补救措施。",
        userTip: "重点看通知方式是否明确，例如信函、电话、推送通知或公告。"
      }
    ]
  },
  {
    id: "user-rights",
    category: "用户权利与退出机制",
    shortTitle: "你能怎么控制？",
    description: "检查平台是否提供查阅、更正、补充、复制、删除、撤回同意、权限关闭、注销账号、投诉联系等用户控制路径。",
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
    items: [
      {
        id: "rights-001",
        question: "是否提供查阅、更正和补充账户信息的路径？",
        riskLevel: "低关注",
        scene: "账户信息管理",
        detail: "政策提到，用户可通过 App 中的个人资料页面查阅或编辑账户中的个人基本资料等信息。",
        whyItMatters: "用户应能查看并修正平台保存的基础个人信息。",
        userTip: "页面可以展示「账户信息—查阅/更正/补充」的操作提示。"
      },
      {
        id: "rights-002",
        question: "是否提供搜索记录、浏览记录、订单记录、发布作品等信息的查阅或删除路径？",
        riskLevel: "低关注",
        scene: "行为记录管理",
        detail: "政策提到，用户可查阅或清除搜索记录、浏览记录，访问或清除订单记录、拼单记录、交易记录，也可查阅或删除发布作品。",
        whyItMatters: "行为记录反映用户兴趣和消费习惯，用户应有一定管理能力。",
        userTip: "可以在网页中设置「我想清理哪些记录」的引导卡片。"
      },
      {
        id: "rights-003",
        question: "是否提供个人信息收集清单供用户统一查阅？",
        riskLevel: "低关注",
        scene: "个人信息透明度",
        detail: "政策提到，用户可在 App 中进入个人信息收集清单，统一查阅相关个人信息。",
        whyItMatters: "个人信息收集清单有助于用户集中了解平台收集了哪些信息。",
        userTip: "建议用户定期查看个人信息收集清单，尤其在开启多个权限后。"
      },
      {
        id: "rights-004",
        question: "是否提供个人信息复制或下载功能？",
        riskLevel: "低关注",
        scene: "个人信息复制",
        detail: "政策提到，用户可通过个人信息下载功能导出相关个人信息，例如账户基本信息。",
        whyItMatters: "复制或下载权有助于用户获取自身数据副本。",
        userTip: "可在页面中提示用户：下载后也要妥善保存文件，避免二次泄露。"
      },
      {
        id: "rights-005",
        question: "是否提供删除个人信息的路径和适用情形？",
        riskLevel: "中关注",
        scene: "删除权",
        detail: "政策提到，用户可通过相关路径删除部分个人信息，并可在处理违法、严重违反约定、停止服务、保存期限已满、未经同意收集、处理目的不再必要等情形下向客服提出删除请求。",
        whyItMatters: "删除权是用户控制个人信息的重要方式，但实践中可能受法律保存义务和技术限制影响。",
        userTip: "提出删除请求时，尽量说明删除对象、原因和对应账号信息。"
      },
      {
        id: "rights-006",
        question: "是否提供撤回同意或关闭系统权限的方式？",
        riskLevel: "低关注",
        scene: "撤回授权",
        detail: "政策提到，用户可以通过删除信息、关闭设备权限等方式改变授权范围或撤回授权，也可通过注销账户撤回部分或全部授权。",
        whyItMatters: "用户应能在不需要某项功能时关闭对应权限。",
        userTip: "建议在使用完相册、麦克风、通讯录、位置等功能后，检查系统权限是否需要继续开启。"
      },
      {
        id: "rights-007",
        question: "撤回同意后，平台是否说明不再处理对应个人信息，但不影响此前处理？",
        riskLevel: "中关注",
        scene: "撤回效果",
        detail: "政策提到，撤回同意或授权后，平台无法继续提供对应服务，也不再处理相应个人信息，但撤回决定不会影响此前基于授权进行的信息处理。",
        whyItMatters: "用户需要理解撤回授权通常只影响未来处理，并不当然否定此前处理。",
        userTip: "如果用户希望删除历史信息，需要进一步行使删除权，而不仅是关闭权限。"
      },
      {
        id: "rights-008",
        question: "是否提供账号注销路径，并说明注销后删除或匿名化处理？",
        riskLevel: "中关注",
        scene: "账号注销",
        detail: "政策提到，用户可通过 App 设置中的账号注销或联系官方客服查看注销方式和条件，注销审核通过后将对个人信息进行删除或匿名化处理，法律法规另有规定的除外。",
        whyItMatters: "注销账号是用户退出服务和减少后续处理的重要机制。",
        userTip: "注销前应注意未完成订单、售后、余额、优惠券、法律保存义务等可能影响注销结果。"
      },
      {
        id: "rights-009",
        question: "是否说明响应用户请求的时限？",
        riskLevel: "低关注",
        scene: "请求响应",
        detail: "政策提到，平台会在身份验证无误后十五日内作出答复。",
        whyItMatters: "响应时限可以帮助用户判断平台是否及时处理个人信息权利请求。",
        userTip: "提交请求后可保留客服记录、申请时间和问题编号。"
      },
      {
        id: "rights-010",
        question: "是否提供投诉、举报电话、隐私邮箱或联系地址？",
        riskLevel: "低关注",
        scene: "投诉与联系",
        detail: "政策提供了客服、意见反馈、举报电话、个人信息保护专职小组邮箱 privacy@pinduoduo.com 以及注册地址等联系渠道。",
        whyItMatters: "明确的联系渠道有助于用户行使权利和投诉。",
        userTip: "如果用户认为个人信息权益受损，可以先通过 App 客服或隐私邮箱联系平台。"
      },
      {
        id: "rights-011",
        question: "是否说明未成年人和儿童个人信息保护规则？",
        riskLevel: "高关注",
        scene: "未成年人保护",
        detail: "政策提到，18 周岁以下未成年人应在监护人同意前提下使用服务；14 周岁以下儿童使用服务前，应阅读专门的儿童个人信息保护规则，并取得监护人同意。",
        whyItMatters: "未成年人尤其是不满十四周岁儿童的个人信息具有更高保护要求。",
        userTip: "家长应关注儿童是否自行下单、发布照片、参与互动或向第三方授权收集信息。"
      },
      {
        id: "rights-012",
        question: "是否说明隐私政策重大变更时会通知用户？",
        riskLevel: "中关注",
        scene: "政策更新",
        detail: "政策提到，对于收集个人信息的目的、方式、范围发生变化等重大变更，会通过站内信或其他适当方式通知用户。",
        whyItMatters: "隐私政策更新可能影响用户数据处理范围，用户需要及时知情。",
        userTip: "用户可在 App 中查看最新隐私政策，尤其在版本更新或功能变化后。"
      }
    ]
  }
];

function initChecklist() {
    const container = document.getElementById('checklistContainer');
    if (!container) return;
    
    container.innerHTML = '<div class="checklist-categories"></div>';
    const categoriesWrapper = container.querySelector('.checklist-categories');
    
    const savedStates = JSON.parse(localStorage.getItem('privacyChecklistStates') || '{}');
    
    privacyChecklist.forEach((category, index) => {
        let highCount = 0;
        category.items.forEach(item => {
            if (getRiskKey(item.riskLevel) === 'high') highCount++;
        });
        
        const categoryEl = document.createElement('div');
        categoryEl.className = 'category-card' + (index === 0 ? ' active' : '');
        categoryEl.dataset.categoryId = category.id;
        
        categoryEl.innerHTML = `
            <div class="category-header">
                <div class="category-info">
                    <div class="category-icon">${category.icon}</div>
                    <div class="category-text">
                        <h3 class="info-tag">${category.category}</h3>
                        <span class="info-tag secondary">${category.shortTitle}</span>
                        <div class="category-meta">
                            <span class="category-count">${category.items.length} 个问题</span>
                            ${highCount > 0 ? `<span class="category-high-count">${highCount} 个高关注</span>` : ''}
                        </div>
                    </div>
                </div>
                <svg class="category-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
            <div class="category-content">
                ${category.items.map(item => `
                    <div class="checklist-item" data-item-id="${item.id}" data-risk="${getRiskKey(item.riskLevel)}">
                        <div class="item-main">
                            <div class="item-checkbox-wrapper">
                                <input type="checkbox" class="item-checkbox" id="${item.id}" ${savedStates[item.id] ? 'checked' : ''}>
                                <label class="item-mark" for="${item.id}"></label>
                            </div>
                            <div class="item-content">
                                <div class="item-question">${item.question}</div>
                                <div class="item-meta">
                                    <span class="info-tag">${item.scene}</span>
                                    <span class="risk-tag ${getRiskKey(item.riskLevel)}">${item.riskLevel}</span>
                                </div>
                                <button class="item-expand-btn">
                                    查看分析
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                <div class="item-explanation">
                                    <div class="explanation-grid">
                                        <div class="explanation-card">
                                            <div class="explanation-label">具体说明</div>
                                            <div class="explanation-text">${item.detail}</div>
                                        </div>
                                        <div class="explanation-card why">
                                            <div class="explanation-label">为什么重要</div>
                                            <div class="explanation-text">${item.whyItMatters}</div>
                                        </div>
                                        <div class="explanation-card tip">
                                            <div class="explanation-label">用户建议</div>
                                            <div class="explanation-text">${item.userTip}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        categoriesWrapper.appendChild(categoryEl);
    });
    
    initCategoryToggle();
    initItemCheckboxes(savedStates);
    initItemExpand();
    initClearAllButton();
    updateStats();
    updateSummary();
}

function initClearAllButton() {
    const btn = document.getElementById('btnClearAll');
    if (!btn) return;
    
    btn.addEventListener('click', function() {
        const allItems = document.querySelectorAll('.checklist-item');
        const checkboxes = document.querySelectorAll('.item-checkbox');
        
        allItems.forEach(item => item.classList.remove('checked'));
        checkboxes.forEach(checkbox => checkbox.checked = false);
        
        localStorage.setItem('privacyChecklistStates', JSON.stringify({}));
        
        updateStats();
        updateSummary();
        
        const categories = document.querySelectorAll('.category-card');
        categories.forEach(category => updateCategoryCount(category));
    });
}

function getRiskKey(riskLevel) {
    const map = {
        '高关注': 'high',
        '中关注': 'medium',
        '低关注': 'low'
    };
    return map[riskLevel] || 'low';
}

function getRiskLabel(risk) {
    const labels = {
        high: '高关注',
        medium: '中关注',
        low: '低关注'
    };
    return labels[risk] || risk;
}

function initCategoryToggle() {
    document.querySelectorAll('.category-header').forEach(header => {
        header.addEventListener('click', function() {
            const category = this.closest('.category-card');
            const isActive = category.classList.contains('active');
            
            document.querySelectorAll('.category-card').forEach(c => {
                c.classList.remove('active');
            });
            
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });
}

function initItemCheckboxes(savedStates) {
    const storageKey = 'privacyChecklistStates';
    
    document.querySelectorAll('.checklist-item').forEach(item => {
        const checkbox = item.querySelector('.item-checkbox');
        const itemId = item.dataset.itemId;
        
        if (savedStates[itemId]) {
            item.classList.add('checked');
        }
        
        checkbox.addEventListener('change', function() {
            const currentStates = JSON.parse(localStorage.getItem(storageKey) || '{}');
            
            if (this.checked) {
                item.classList.add('checked');
                currentStates[itemId] = true;
            } else {
                item.classList.remove('checked');
                delete currentStates[itemId];
            }
            
            localStorage.setItem(storageKey, JSON.stringify(currentStates));
            updateCategoryCount(item.closest('.category-card'));
            updateStats();
            updateSummary();
        });
    });
    
    updateStats();
    updateSummary();
}

function updateCategoryCount(categoryEl) {
    const items = categoryEl.querySelectorAll('.checklist-item');
    const checked = categoryEl.querySelectorAll('.checklist-item.checked').length;
    const countEl = categoryEl.querySelector('.category-count');
    countEl.textContent = `${checked} / ${items.length} 已检查`;
}

function updateStats() {
    const checkedItems = document.querySelectorAll('.checklist-item.checked');
    const highChecked = document.querySelectorAll('.checklist-item[data-risk="high"].checked').length;
    const mediumChecked = document.querySelectorAll('.checklist-item[data-risk="medium"].checked').length;
    const lowChecked = document.querySelectorAll('.checklist-item[data-risk="low"].checked').length;
    
    document.getElementById('checkedCount').textContent = checkedItems.length;
    document.getElementById('highCount').textContent = highChecked;
    document.getElementById('mediumCount').textContent = mediumChecked;
    document.getElementById('lowCount').textContent = lowChecked;
}

function updateSummary() {
    const summaryEl = document.getElementById('checklistSummary');
    const summaryContent = document.getElementById('summaryContent');
    if (!summaryEl || !summaryContent) return;

    const checkedHighItems = document.querySelectorAll('.checklist-item[data-risk="high"].checked');

    if (checkedHighItems.length === 0) {
        summaryEl.classList.add('collapsed');
        summaryEl.classList.remove('expanded');
        summaryContent.innerHTML = '<p class="summary-empty">暂无勾选的高关注项目</p>';
        return;
    }

    summaryEl.classList.remove('collapsed');
    summaryEl.classList.add('expanded');

    summaryContent.innerHTML = Array.from(checkedHighItems).map(item => {
        const questionEl = item.querySelector('.item-question');
        const sceneEl = item.querySelector('.item-meta .info-tag');

        const question = questionEl ? questionEl.textContent : '';
        const scene = sceneEl ? sceneEl.textContent : '';

        return `<div class="summary-item">
            <div class="summary-question">${question}</div>
            <div class="summary-scene">${scene}</div>
        </div>`;
    }).join('');

    const summaryHeader = summaryEl.querySelector('.summary-title');
    if (summaryHeader && !summaryHeader.dataset.bound) {
        summaryHeader.addEventListener('click', function() {
            summaryEl.classList.toggle('expanded');
        });
        summaryHeader.dataset.bound = 'true';
    }
}

function initItemExpand() {
    document.querySelectorAll('.item-expand-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const item = this.closest('.checklist-item');
            item.classList.toggle('expanded');
            
            const text = item.classList.contains('expanded') ? '收起详情' : '查看详情';
            this.innerHTML = `${text}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>`;
        });
    });
}

const privacyDictionary = [
  {
    id: "personal-information",
    term: "个人信息",
    tag: "基础概念",
    riskLevel: "基础",
    plainExplanation: "能够单独或结合其他信息识别到特定自然人的各种信息。简单说，只要某类信息能指向「你是谁」或「可能是你」，就可能属于个人信息。",
    commonScenarios: [
      "手机号注册登录",
      "填写收货地址",
      "绑定账号",
      "下单购物",
      "使用客服与售后服务"
    ],
    pddExample: "在拼多多场景中，手机号、收货人姓名、收货地址、收货手机号、订单信息、支付信息、设备信息、浏览记录等都可能属于个人信息。",
    industryReference: "电商平台通常会围绕注册登录、商品展示、下单、支付、配送、售后等场景收集个人信息；内容社区和短视频平台还会围绕浏览、搜索、发布、互动等行为收集个人信息。",
    readingTip: "阅读隐私政策时，先找「我们如何收集和使用您的个人信息」这一部分，看平台是否逐项说明收集的信息类型和使用目的。"
  },
  {
    id: "sensitive-personal-information",
    term: "敏感个人信息",
    tag: "高风险信息",
    riskLevel: "高",
    plainExplanation: "一旦泄露或被滥用，可能对人身安全、财产安全或人格尊严造成较大影响的信息。",
    commonScenarios: [
      "身份证件信息",
      "面部识别信息",
      "精确位置信息",
      "金融账户信息",
      "不满十四周岁儿童的个人信息"
    ],
    pddExample: "拼多多在账号找回、手机号换绑等场景中可能要求提交身份证件信息或面部信息；跨境交易中也可能需要身份证件信息用于清关。",
    industryReference: "头部平台通常会将身份证件、人脸、精确位置、支付账户、儿童信息等作为高敏感度信息处理，并在特定场景中强调必要性和授权。",
    readingTip: "看到身份证、人脸、精确定位、儿童信息等内容时，要重点看平台是否说明收集必要性、使用目的、保存期限和保护措施。"
  },
  {
    id: "basic-function-necessary-info",
    term: "基本功能必要信息",
    tag: "基础概念",
    riskLevel: "基础",
    plainExplanation: "为了让产品的核心功能正常运行，用户必须提供或平台必须处理的信息。",
    commonScenarios: [
      "注册登录需要手机号",
      "购物下单需要收货地址",
      "支付需要订单编号和支付金额",
      "配送需要收货人姓名、地址和手机号"
    ],
    pddExample: "拼多多将注册及登录、展示商品/服务、交易及售后、保障账户及交易安全等列为基本功能，并说明用户需授权收集必要信息。",
    industryReference: "京东等电商平台也会把账号注册登录、商品展示、下单及订单管理、支付、交付、客服售后、交易安全保障作为网上购物基本功能。",
    readingTip: "判断一项信息是否必要，可以问：没有这项信息，平台是否真的无法提供核心服务？"
  },
  {
    id: "additional-function-info",
    term: "附加功能非必要信息",
    tag: "授权同意",
    riskLevel: "中",
    plainExplanation: "不是使用核心服务必须提供的信息，但为了获得更丰富或更个性化的体验，平台可能会请求用户授权。",
    commonScenarios: [
      "开启通讯录找好友",
      "使用相机拍照识图",
      "使用麦克风联系客服",
      "开启位置推荐附近服务",
      "读取相册用于晒单或评价"
    ],
    pddExample: "拼多多政策说明，附加功能收集、处理非必要个人信息时会单独征求用户同意，用户不提供仍可使用基本功能，但可能无法使用附加体验。",
    industryReference: "头部 App 通常会把相机、相册、位置、麦克风、通讯录等权限对应的功能列为附加服务。",
    readingTip: "看到权限弹窗时，不要只点同意，先判断这个权限是否和当前使用的功能直接相关。"
  },
  {
    id: "consent",
    term: "授权同意",
    tag: "授权同意",
    riskLevel: "基础",
    plainExplanation: "平台在处理某些个人信息前，需要向用户说明处理目的、方式和范围，并取得用户同意。",
    commonScenarios: [
      "同意隐私政策",
      "授权读取位置",
      "授权读取通讯录",
      "授权第三方账号登录",
      "授权人脸识别"
    ],
    pddExample: "拼多多在本机号码一键登录、第三方账号登录、系统权限开启等场景中，会基于用户授权处理相关信息。",
    industryReference: "行业头部平台通常通过隐私政策、权限弹窗、功能页面提示、第三方授权页面等方式取得用户授权。",
    readingTip: "重点看授权是否具体、清楚，而不是用一句「我同意全部条款」覆盖所有数据处理场景。"
  },
  {
    id: "separate-consent",
    term: "单独同意",
    tag: "授权同意",
    riskLevel: "高",
    plainExplanation: "对于某些更敏感或影响更大的处理活动，平台不能只靠总括同意，而应当针对该事项单独取得用户同意。",
    commonScenarios: [
      "处理敏感个人信息",
      "向其他个人信息处理者提供个人信息",
      "公开披露个人信息",
      "向境外提供个人信息"
    ],
    pddExample: "拼多多政策中提到，附加功能处理非必要个人信息会单独征求同意；个人信息存储在境内的例外也包括获得单独同意。",
    industryReference: "头部平台通常会在涉及敏感信息、跨境、公开披露、重大权限调用时设置更明显的授权提示。",
    readingTip: "如果平台要处理身份证、人脸、精确位置、儿童信息或出境数据，用户应重点看是否有单独、明确的同意机制。"
  },
  {
    id: "withdraw-consent",
    term: "撤回同意",
    tag: "用户权利",
    riskLevel: "中",
    plainExplanation: "用户可以取消之前对某些个人信息处理活动的授权。撤回后，平台通常不应继续处理对应信息。",
    commonScenarios: [
      "关闭定位权限",
      "关闭相册权限",
      "关闭通讯录权限",
      "退订营销短信",
      "关闭个性化推荐"
    ],
    pddExample: "拼多多说明，用户可以通过删除信息、关闭设备权限等方式改变授权范围或撤回授权，也可以通过注销账户撤回部分或全部授权。",
    industryReference: "行业平台通常会在系统设置、App 设置、隐私设置、消息设置中提供撤回或关闭入口。",
    readingTip: "撤回同意通常只影响未来处理，不一定自动删除历史数据。若想删除历史数据，还要进一步查看删除权路径。"
  },
  {
    id: "account-info",
    term: "账号信息",
    tag: "基础概念",
    riskLevel: "基础",
    plainExplanation: "用于识别和管理用户账号的信息，通常包括手机号、账号 ID、昵称、头像、登录方式等。",
    commonScenarios: [
      "手机号注册",
      "短信验证码登录",
      "第三方账号登录",
      "账号找回",
      "手机号换绑"
    ],
    pddExample: "拼多多注册登录时可能收集手机号；用户使用微信、QQ 登录时，平台会根据授权获取头像、昵称等第三方账户信息。",
    industryReference: "电商，内容社区、短视频平台普遍会围绕账号注册、登录、安全验证、账号找回等场景收集账号信息。",
    readingTip: "重点看账号信息是否还会用于公开展示、好友推荐、营销触达或安全风控。"
  },
  {
    id: "third-party-login",
    term: "第三方账号登录",
    tag: "平台行为",
    riskLevel: "中",
    plainExplanation: "用户使用微信、QQ、支付宝、Apple ID 等外部账号登录某个平台，平台会根据授权获取部分第三方账号信息。",
    commonScenarios: [
      "微信登录",
      "QQ 登录",
      "支付宝授权登录",
      "Apple ID 登录"
    ],
    pddExample: "拼多多政策说明，用户使用微信、QQ 等第三方账户登录时，会根据授权获取第三方账户信息，包括头像、昵称以及授权页面显示的其他信息。",
    industryReference: "头部平台普遍支持第三方登录，以提升注册登录便利性，但也会形成账号之间的数据关联。",
    readingTip: "使用第三方登录前，要看授权页面显示了哪些信息，不要默认把所有可选信息都授权出去。"
  },
  {
    id: "order-information",
    term: "订单信息",
    tag: "电商场景",
    riskLevel: "中",
    plainExplanation: "用户购买商品或服务时形成的交易记录，通常能反映用户买了什么、何时购买、花了多少钱、送到哪里。",
    commonScenarios: [
      "商品名称",
      "订单编号",
      "下单时间",
      "交易金额",
      "优惠信息",
      "支付方式"
    ],
    pddExample: "拼多多订单信息包括订单编号、商品/服务信息、下单时间、拼单时间、优惠信息、实际支付金额、支付方式等。",
    industryReference: "电商平台普遍会将订单信息用于交易确认、支付结算、配送、发票、售后、争议处理和交易安全判断。",
    readingTip: "订单信息很容易暴露消费习惯，阅读时要关注它是否会被用于推荐、营销或与第三方共享。"
  },
  {
    id: "payment-information",
    term: "支付信息",
    tag: "电商场景",
    riskLevel: "中",
    plainExplanation: "为完成付款而需要处理的信息，通常包括订单编号、交易金额、支付方式和支付状态等。",
    commonScenarios: [
      "微信支付",
      "支付宝支付",
      "平台钱包支付",
      "银行卡支付",
      "好友代付"
    ],
    pddExample: "拼多多会将订单编号、交易金额以及其他支付和法律要求的必要信息提供给用户选择的第三方支付机构，以完成支付。",
    industryReference: "电商平台通常会与支付机构共享必要支付信息，但不一定直接获取完整银行卡信息。",
    readingTip: "重点看支付信息提供给了哪家支付机构、用于什么目的、是否还会用于售后和争议解决。"
  },
  {
    id: "delivery-information",
    term: "配送信息",
    tag: "电商场景",
    riskLevel: "中",
    plainExplanation: "为了把商品送到用户手中而需要使用的信息，通常包括收货人姓名、收货地址、手机号等。",
    commonScenarios: [
      "快递配送",
      "门店自提",
      "售后退换货",
      "物流查询"
    ],
    pddExample: "拼多多政策中提到，商家、物流配送主体或其他物流服务提供主体可能使用收货人姓名、收货地址、收货手机号等配送必要信息。",
    industryReference: "淘宝、京东、拼多多等电商平台都会在交易履约中涉及商家、物流公司、仓储服务等第三方。",
    readingTip: "重点看平台是否说明配送信息会提供给哪些主体，以及是否有号码保护、隐私面单等保护措施。"
  },
  {
    id: "customer-service-info",
    term: "客服与售后信息",
    tag: "电商场景",
    riskLevel: "中",
    plainExplanation: "用户在咨询、投诉、退货、售后、纠纷处理时向平台或商家提供的信息。",
    commonScenarios: [
      "客服聊天记录",
      "通话录音",
      "投诉材料",
      "售后图片",
      "订单截图",
      "身份核验信息"
    ],
    pddExample: "拼多多可能保存用户的沟通、通信/通话记录及相关内容，包括联系方式、账号信息、订单信息或用户为证明事实提供的其他信息。",
    industryReference: "电商平台普遍会保存客服与售后记录，用于解决问题、处理纠纷、提升服务质量和保障交易安全。",
    readingTip: "提交售后材料时，只提供必要信息，避免上传无关身份证件、完整银行卡号或包含他人隐私的图片。"
  },
  {
    id: "device-information",
    term: "设备信息",
    tag: "设备与权限",
    riskLevel: "高",
    plainExplanation: "与用户设备有关的信息，可能用于识别设备、保障安全、适配功能或进行风控。",
    commonScenarios: [
      "设备型号",
      "操作系统",
      "设备标识符",
      "IP 地址",
      "网络环境",
      "传感器信息",
      "应用列表信息"
    ],
    pddExample: "拼多多在账户及交易安全场景中可能获取应用列表、应用版本、Android ID、OAID/IDFA、Mac 地址、设备网络环境、加速度和重力等传感器信息。",
    industryReference: "头部 App 通常会在安全风控、反作弊、崩溃排查、消息推送、广告归因等场景处理设备信息。",
    readingTip: "设备信息范围越细，越要关注其使用目的是否限定在安全、风控或功能实现范围内。"
  },
  {
    id: "log-information",
    term: "日志信息 / 行为记录",
    tag: "推荐广告",
    riskLevel: "中",
    plainExplanation: "用户在平台上的浏览、搜索、点击、收藏、关注、分享、交易、售后等行为记录。",
    commonScenarios: [
      "搜索记录",
      "浏览记录",
      "点击记录",
      "收藏记录",
      "关注关系",
      "分享历史",
      "交易记录"
    ],
    pddExample: "拼多多附录中将日志信息列为搜索记录、点击查看记录、浏览记录、收藏记录、关注关系、分享历史、交易、售后、发布信息等。",
    industryReference: "电商平台会用行为记录进行商品推荐、优惠提示和交易安全判断；内容平台会用行为记录优化内容推荐和互动体验。",
    readingTip: "重点看日志信息是否用于个性化推荐、用户画像、广告投放或商业营销。"
  },
  {
    id: "system-permission",
    term: "系统权限",
    tag: "设备与权限",
    riskLevel: "高",
    plainExplanation: "App 调用手机系统能力时需要用户授权的权限，例如位置、相机、相册、麦克风、通讯录等。",
    commonScenarios: [
      "拍照识图",
      "扫码",
      "上传评价图片",
      "语音客服",
      "定位推荐附近服务",
      "读取通讯录找好友"
    ],
    pddExample: "拼多多权限申请清单列明了位置、摄像头、相册、麦克风、通讯录、存储、身体活动识别、剪贴板、蓝牙等权限及其使用场景。",
    industryReference: "行业平台一般会通过权限清单或系统弹窗说明权限用途，但实际使用时仍需用户判断是否必要。",
    readingTip: "权限不是越多越好。只有在使用具体功能时再开启，用完后可以关闭。"
  },
  {
    id: "contacts-permission",
    term: "通讯录权限",
    tag: "设备与权限",
    riskLevel: "高",
    plainExplanation: "App 读取用户手机通讯录的权限。它不仅涉及用户本人，也涉及通讯录中其他人的信息。",
    commonScenarios: [
      "添加通讯录好友",
      "好友推荐",
      "邀请好友",
      "共同参与活动",
      "快捷填写联系人号码"
    ],
    pddExample: "拼多多说明，用户授权读取通讯录后，可添加通讯录好友，也可能根据手机号、通讯录等关系进行好友推荐或将用户推荐给相应用户。",
    industryReference: "社交、内容社区、电商互动功能中常见通讯录权限，但这类权限隐私敏感度较高。",
    readingTip: "非必要不要开启通讯录权限。只是购物、浏览商品，一般不需要读取通讯录。"
  },
  {
    id: "clipboard",
    term: "剪贴板",
    tag: "设备与权限",
    riskLevel: "高",
    plainExplanation: "手机系统中临时保存复制内容的区域，可能包含链接、口令、验证码、地址、账号等信息。",
    commonScenarios: [
      "复制商品链接",
      "识别分享口令",
      "打开活动链接",
      "识别短信验证码",
      "跨 App 跳转"
    ],
    pddExample: "拼多多说明，在分享或接收被分享信息、参加活动等情形下，需要在本地访问剪贴板，读取口令、分享码、链接，以实现跳转、分享、活动联动等功能。",
    industryReference: "电商和内容平台常用剪贴板识别分享口令或链接，但用户对剪贴板读取较敏感。",
    readingTip: "重点看平台是否说明只在本地识别、是否上传服务器、是否只处理与本平台相关的口令或链接。"
  },
  {
    id: "cookie",
    term: "Cookie 及类似技术",
    tag: "推荐广告",
    riskLevel: "中",
    plainExplanation: "网站或 App 用来识别设备、记录访问状态、分析使用习惯或优化广告互动的技术。",
    commonScenarios: [
      "保持登录状态",
      "记住浏览偏好",
      "判断账户安全",
      "统计访问人数",
      "优化广告展示"
    ],
    pddExample: "拼多多政策说明，可能使用 Cookie、匿名标识符、网络 beacon 等技术，用于保障服务安全高效运转、了解使用习惯、判断账户安全，也可能用于展示感兴趣的信息和优化广告互动。",
    industryReference: "头部平台普遍会在网页、App、小程序场景中使用 Cookie、匿名标识符或类似技术。",
    readingTip: "重点看 Cookie 是否仅用于安全和登录，还是也用于广告、推荐和跨站追踪。"
  },
  {
    id: "personalized-recommendation",
    term: "个性化推荐",
    tag: "推荐广告",
    riskLevel: "中",
    plainExplanation: "平台根据用户的浏览、搜索、购买、点击、关注等行为，推荐其可能感兴趣的商品、内容或服务。",
    commonScenarios: [
      "猜你喜欢",
      "首页商品推荐",
      "搜索结果排序",
      "短视频推荐流",
      "附近服务推荐"
    ],
    pddExample: "拼多多可能根据设备信息、日志信息、订单信息等提取偏好特征，并基于偏好特征推荐用户可能感兴趣的商品、服务或其他信息。",
    industryReference: "电商、短视频、内容社区平台都高度依赖个性化推荐。抖音等内容平台还会围绕浏览、搜索、发布、互动等基础服务说明推荐相关数据处理。",
    readingTip: "重点看是否提供关闭个性化推荐的入口，以及关闭后是否仍能使用基本功能。"
  },
  {
    id: "user-profile",
    term: "用户画像 / 偏好特征",
    tag: "推荐广告",
    riskLevel: "高",
    plainExplanation: "平台根据用户行为推测用户兴趣、消费能力、偏好、习惯或风险状态。",
    commonScenarios: [
      "根据浏览记录判断兴趣",
      "根据订单判断消费偏好",
      "根据设备信息判断异常风险",
      "根据互动行为推荐好友或内容"
    ],
    pddExample: "拼多多政策中使用了「提取您的偏好特征」的表述，并说明可能基于偏好特征推荐内容、排序信息、发送商业短信或展示广告。",
    industryReference: "行业头部平台通常会把行为记录、订单信息、互动信息、设备信息用于推荐、广告、风控或体验优化。",
    readingTip: "看到「偏好特征」「用户画像」「个性化展示」「智能推荐」等词时，要重点看是否有关闭方式。"
  },
  {
    id: "personalized-ads",
    term: "个性化广告",
    tag: "推荐广告",
    riskLevel: "高",
    plainExplanation: "平台根据用户特征、行为或兴趣展示更可能吸引用户点击的广告。",
    commonScenarios: [
      "商品广告推荐",
      "优惠活动推送",
      "站内广告",
      "第三方应用推送广告",
      "广告效果分析"
    ],
    pddExample: "拼多多说明，用户可以在个性化广告管理中管理系统展示的个性化广告或通过其他第三方应用程序推送的广告。",
    industryReference: "头部平台通常会区分个性化内容推荐和个性化广告，并提供不同的管理入口。",
    readingTip: "关闭个性化广告通常不等于不再看到广告，而是广告不再主要基于个人特征展示。"
  },
  {
    id: "commercial-message",
    term: "商业性短信 / 营销推送",
    tag: "推荐广告",
    riskLevel: "高",
    plainExplanation: "平台通过手机号、站内信、Push、邮件等方式向用户发送促销、优惠、活动或广告信息。",
    commonScenarios: [
      "优惠短信",
      "活动短信",
      "App 推送通知",
      "站内消息",
      "邮件营销"
    ],
    pddExample: "拼多多政策说明，可能通过注册手机号、收货手机号等联系方式发送商业性短信息，并说明商业性短信息默认开启，可通过短信退订或 App 设置关闭。",
    industryReference: "电商平台常见营销短信和活动推送，内容平台常见 Push 推送和站内消息。",
    readingTip: "重点看营销信息是否默认开启、是否能一键退订、是否把收货手机号也用于营销触达。"
  },
  {
    id: "third-party-sharing",
    term: "第三方共享",
    tag: "第三方处理",
    riskLevel: "高",
    plainExplanation: "平台把用户个人信息提供给平台以外的公司、机构或个人，让对方为了特定目的处理这些信息。",
    commonScenarios: [
      "向支付机构提供支付信息",
      "向物流公司提供配送信息",
      "向商家提供订单信息",
      "向广告合作方提供广告效果信息",
      "向关联公司共享账号或交易安全信息"
    ],
    pddExample: "拼多多信息共享清单列明了支付机构、平台内商家等接收方，以及共享目的、共享信息种类和共享方式。",
    industryReference: "电商平台通常会与支付、物流、商家、客服、安全风控、广告分析等第三方发生数据流转。",
    readingTip: "重点看四个问题：给谁、给什么、为什么给、用户能否拒绝非必要共享。"
  },
  {
    id: "entrusted-processing",
    term: "委托处理",
    tag: "第三方处理",
    riskLevel: "中",
    plainExplanation: "平台委托合作伙伴或关联公司代表自己处理个人信息，但处理目的和范围通常由平台决定。",
    commonScenarios: [
      "云服务商存储数据",
      "短信服务商发送验证码",
      "客服系统处理工单",
      "数据分析服务",
      "安全服务"
    ],
    pddExample: "拼多多政策说明，可能委托合作伙伴或关联公司处理个人信息，包括广告分析服务类合作伙伴、供应商、服务提供商和其他合作伙伴。",
    industryReference: "头部平台普遍会使用云服务、数据分析、安全服务、客服服务、消息推送等外部服务能力。",
    readingTip: "委托处理不等于平台把责任完全转给第三方，仍要看平台是否说明委托目的、范围和安全约束。"
  },
  {
    id: "sdk",
    term: "第三方 SDK",
    tag: "第三方处理",
    riskLevel: "高",
    plainExplanation: "SDK 是嵌入 App 中的第三方软件工具包，用于实现登录、支付、分享、推送、统计、广告、安全等功能。",
    commonScenarios: [
      "微信登录 SDK",
      "支付宝支付 SDK",
      "QQ 分享 SDK",
      "手机厂商推送 SDK",
      "广告统计 SDK"
    ],
    pddExample: "拼多多第三方 SDK 目录列明了 SDK 名称、运营方、用途、处理的个人信息类型、处理方式及官网/隐私政策链接。",
    industryReference: "多数头部 App 都会接入 SDK。SDK 可能直接在本机采集设备信息，因此需要单独关注。",
    readingTip: "阅读 SDK 目录时，重点看 SDK 用途是否必要、采集哪些信息、是否涉及设备标识符、是否有第三方隐私政策链接。"
  },
  {
    id: "public-disclosure",
    term: "公开披露",
    tag: "第三方处理",
    riskLevel: "高",
    plainExplanation: "平台将个人信息向不特定公众公开，例如公开展示、公告、披露违规行为等。",
    commonScenarios: [
      "用户主动发布评价",
      "公开视频或图片",
      "直播间互动展示",
      "因违法违规被披露处理措施",
      "法律法规要求公开"
    ],
    pddExample: "拼多多说明，用户发布评价、评论、图文、视频时，头像、昵称、评论内容或发布内容可能公开展示；平台公开披露通常限于单独同意、主动选择或法律要求等情形。",
    industryReference: "内容社区和短视频平台更常见公开发布场景，电商平台也会在评价、晒单、直播互动中出现公开展示。",
    readingTip: "公开发布前要检查图片、视频和评论里是否出现手机号、地址、订单号、儿童照片或他人信息。"
  },
  {
    id: "data-transfer",
    term: "个人信息转让",
    tag: "第三方处理",
    riskLevel: "中",
    plainExplanation: "因合并、分立、解散、破产或业务转让等原因，个人信息控制方可能发生变化。",
    commonScenarios: [
      "公司合并",
      "业务出售",
      "公司分立",
      "平台破产清算",
      "业务主体变更"
    ],
    pddExample: "拼多多政策说明，涉及合并、分立、解散、破产或类似交易需要转移个人信息时，会告知接收方名称或联系方式；接收方变更原处理目的或方式的，会重新征求授权同意。",
    industryReference: "行业平台通常会在隐私政策中设置「转让」条款，用于覆盖业务主体变更场景。",
    readingTip: "重点看新接收方是谁、联系方式是什么、是否继续受原隐私政策约束。"
  },
  {
    id: "storage-location",
    term: "存储地点",
    tag: "存储与安全",
    riskLevel: "中",
    plainExplanation: "平台把用户个人信息保存在哪个国家或地区。",
    commonScenarios: [
      "中国境内存储",
      "跨境电商交易",
      "境外服务器",
      "境外关联公司处理",
      "境外服务商处理"
    ],
    pddExample: "拼多多政策说明，用户个人信息将全部存储于中华人民共和国境内，但法律法规另有规定、获得单独同意、跨境电子商务交易及合同履行所必需等情形除外。",
    industryReference: "中国头部平台通常会说明境内存储规则，同时为跨境业务、境外服务、法定要求保留例外。",
    readingTip: "看到跨境购物、境外服务商、国际支付、海外仓等场景时，要进一步查看个人信息是否会出境。"
  },
  {
    id: "retention-period",
    term: "保存期限",
    tag: "存储与安全",
    riskLevel: "中",
    plainExplanation: "平台保存个人信息的时间长度。保存期限通常应与处理目的相关，不应无限期保存。",
    commonScenarios: [
      "交易记录保存",
      "账号存续期间保存",
      "售后争议期间保存",
      "法律规定的保存期限",
      "用户同意更长保存期限"
    ],
    pddExample: "拼多多说明，只会在达成本政策所述目的所需期限内保留个人信息；商品和服务信息、交易信息按照电子商务法要求自交易完成之日起不少于三年。",
    industryReference: "电商平台通常需要依法保存交易信息；内容平台也可能根据账号、内容、风控、投诉处理等目的保存相关记录。",
    readingTip: "重点看平台是否只写「必要期限」，还是说明不同信息类型的具体保存规则。"
  },
  {
    id: "deletion-anonymization",
    term: "删除与匿名化",
    tag: "用户权利",
    riskLevel: "中",
    plainExplanation: "删除是清除个人信息；匿名化是让信息无法识别特定个人且不能复原。",
    commonScenarios: [
      "注销账号后删除或匿名化",
      "保存期限届满后删除",
      "处理目的完成后删除",
      "用户请求删除",
      "备份系统延迟清除"
    ],
    pddExample: "拼多多说明，超出保存期间后会删除个人信息或进行匿名化处理；用户删除信息后，因法律和安全技术限制，备份系统可能无法立即删除，但会限制进一步处理。",
    industryReference: "头部平台通常会把删除、匿名化、账号注销和备份系统处理放在用户权利或存储章节中说明。",
    readingTip: "前台删除不一定等于后台全部立即删除，尤其是订单、交易、售后和法定保存信息。"
  },
  {
    id: "cross-border-transfer",
    term: "个人信息出境 / 跨境传输",
    tag: "存储与安全",
    riskLevel: "高",
    plainExplanation: "个人信息被提供给境外机构、服务器、关联公司或服务商处理。",
    commonScenarios: [
      "跨境购物清关",
      "境外商家发货",
      "国际物流",
      "境外支付",
      "境外技术服务"
    ],
    pddExample: "拼多多政策将跨境电子商务交易及其他类型合同订立和履行所必需列为境内存储规则的例外情形。",
    industryReference: "跨境电商、国际物流、境外支付、海外服务等场景中更容易出现个人信息出境。",
    readingTip: "重点看境外接收方是谁、处理目的是什么、涉及哪些信息、用户如何行使权利，以及是否取得单独同意。"
  },
  {
    id: "automated-decision",
    term: "自动化决策",
    tag: "推荐广告",
    riskLevel: "高",
    plainExplanation: "平台通过算法或系统自动分析用户数据，并影响内容展示、商品排序、广告推荐或交易条件。",
    commonScenarios: [
      "个性化商品排序",
      "短视频推荐流",
      "广告定向投放",
      "风险评分",
      "价格或优惠展示"
    ],
    pddExample: "拼多多政策虽然主要使用「偏好特征」「推荐」「排序」「广告」等表述，但这些场景都可能涉及自动化分析用户信息。",
    industryReference: "电商、短视频、内容社区平台都大量依赖算法推荐和自动化排序。",
    readingTip: "重点看平台是否提供不针对个人特征的选项，或提供关闭、拒绝个性化推荐的方式。"
  },
  {
    id: "user-rights",
    term: "用户个人信息权益",
    tag: "用户权利",
    riskLevel: "基础",
    plainExplanation: "用户对自己的个人信息享有查询、更正、复制、删除、撤回同意、注销账号、投诉等控制权。",
    commonScenarios: [
      "查看个人资料",
      "清除搜索记录",
      "删除浏览记录",
      "下载个人信息",
      "申请删除信息",
      "投诉平台处理行为"
    ],
    pddExample: "拼多多政策列明了查阅、更正、补充、复制、删除、撤回授权、注销账户、投诉联系等用户权利路径。",
    industryReference: "淘宝、京东、抖音、小红书等头部平台通常都会在隐私政策中设置「管理您的个人信息」或类似章节。",
    readingTip: "一份好的隐私政策不只告诉你平台收集什么，还要告诉你如何查、改、删、撤回和投诉。"
  },
  {
    id: "account-cancellation",
    term: "账号注销",
    tag: "用户权利",
    riskLevel: "中",
    plainExplanation: "用户退出平台账号体系的机制。注销后，平台通常应删除或匿名化处理相关个人信息，但法律法规另有规定的除外。",
    commonScenarios: [
      "不再使用平台",
      "希望停止继续处理数据",
      "关闭长期不用账号",
      "减少账号被盗风险"
    ],
    pddExample: "拼多多说明，用户可通过 App 设置中的账号注销或联系官方客服查看注销方式和条件，注销审核通过后将对个人信息进行删除或匿名化处理。",
    industryReference: "头部平台一般会提供账号注销入口，但可能要求处理完未完成订单、售后、余额、会员权益等事项。",
    readingTip: "注销前要检查是否有未完成订单、退款、售后、余额、发票、会员权益或法定保存信息。"
  },
  {
    id: "minor-information",
    term: "未成年人个人信息",
    tag: "未成年人保护",
    riskLevel: "高",
    plainExplanation: "未满十八周岁用户的个人信息，其中不满十四周岁儿童的个人信息通常受到更严格保护。",
    commonScenarios: [
      "儿童账号使用",
      "家长代为下单",
      "发布儿童照片",
      "学习 App 课程互动",
      "未成年人直播或评论互动"
    ],
    pddExample: "拼多多政策要求，18 周岁以下未成年人应在监护人同意前提下使用服务；14 周岁以下儿童使用服务前，应阅读儿童个人信息保护规则并取得监护人同意。",
    industryReference: "淘宝、小红书等平台也设置了未成年人或儿童个人信息保护规则，用于说明监护人同意、儿童信息处理和安全保护等内容。",
    readingTip: "家长要特别关注孩子是否发布照片、参与互动、开通权限、向第三方授权或自行下单。"
  },
  {
    id: "security-incident-notice",
    term: "个人信息安全事件通知",
    tag: "存储与安全",
    riskLevel: "中",
    plainExplanation: "发生个人信息泄露、篡改、丢失、被非法访问等安全事件后，平台向用户和监管部门进行通知或报告的机制。",
    commonScenarios: [
      "账号信息泄露",
      "数据库被攻击",
      "订单信息外泄",
      "密码或验证码被盗用",
      "系统漏洞导致信息暴露"
    ],
    pddExample: "拼多多说明，如发生个人信息安全事件，将告知事件基本情况和可能影响、处置措施、防范建议、补救措施，并按监管要求上报。",
    industryReference: "淘宝等头部平台也会在隐私政策中说明安全事件响应、用户通知和监管上报机制。",
    readingTip: "重点看通知方式是否明确，例如短信、电话、推送通知、公告，以及是否说明补救措施。"
  },
  {
    id: "privacy-policy-update",
    term: "隐私政策更新 / 重大变更",
    tag: "政策透明度",
    riskLevel: "中",
    plainExplanation: "平台因业务、技术或法律变化调整隐私政策，并向用户公示或通知的过程。",
    commonScenarios: [
      "新增个人信息收集目的",
      "改变信息使用方式",
      "新增第三方共享对象",
      "用户权利行使方式变化",
      "隐私负责人联系方式变化"
    ],
    pddExample: "拼多多说明，对于收集个人信息的目的、方式、范围发生变化等重大变更，会通过站内信或其他适当方式通知用户。",
    industryReference: "淘宝政策中也列举了重大变更情形，例如业务模式重大变化、共享或公开披露对象变化、用户权利行使方式变化等。",
    readingTip: "App 更新后可以重新查看隐私政策，尤其关注数据收集范围、第三方共享、权限调用和用户权利是否变化。"
  }
];

function initDictionary() {
    const grid = document.getElementById('dictionaryGrid');
    const filterTagsContainer = document.getElementById('filterTags');
    const searchInput = document.getElementById('searchInput');
    const emptyState = document.getElementById('dictionaryEmpty');
    
    if (!grid) return;
    
    filterTagsContainer.innerHTML = '';
    
    const pillsContainer = document.createElement('div');
    pillsContainer.className = 'filter-pills';
    
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-pill active';
    allBtn.dataset.tag = 'all';
    allBtn.textContent = '全部';
    allBtn.addEventListener('click', () => selectTag('all'));
    pillsContainer.appendChild(allBtn);
    
    const allTags = [...new Set(privacyDictionary.map(item => item.tag))];
    allTags.forEach(tag => {
        const btn = document.createElement('button');
        btn.className = 'filter-pill';
        btn.dataset.tag = tag;
        btn.textContent = tag;
        btn.addEventListener('click', () => selectTag(tag));
        pillsContainer.appendChild(btn);
    });
    
    filterTagsContainer.appendChild(pillsContainer);
    
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        currentPage = 1;
        renderDictionary();
    });
    
    renderDictionary();
    
    const moreBtn = document.getElementById('dictionaryMoreBtn');
    if (moreBtn) {
        moreBtn.addEventListener('click', () => {
            currentPage++;
            renderDictionary(true);
        });
    }
}

function selectTag(tag) {
    currentTag = tag;
    currentPage = 1;
    document.querySelectorAll('.filter-pill').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tag === tag);
    });
    renderDictionary();
}

function getDictionaryRiskKey(riskLevel) {
    const map = {
        '高': 'high',
        '中': 'medium',
        '基础': 'low'
    };
    return map[riskLevel] || 'low';
}

function renderDictionary(append = false) {
    const grid = document.getElementById('dictionaryGrid');
    const emptyState = document.getElementById('dictionaryEmpty');
    const moreBtn = document.getElementById('dictionaryMore');
    
    const filtered = privacyDictionary.filter(item => {
        const matchesTag = currentTag === 'all' || item.tag === currentTag;
        
        let matchesSearch = true;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const searchFields = [
                item.term,
                item.plainExplanation,
                item.tag,
                item.riskLevel
            ];
            if (Array.isArray(item.commonScenarios)) {
                searchFields.push(...item.commonScenarios);
            }
            if (item.pddExample) searchFields.push(item.pddExample);
            if (item.industryReference) searchFields.push(item.industryReference);
            if (item.readingTip) searchFields.push(item.readingTip);
            
            matchesSearch = searchFields.some(field => 
                field && field.toLowerCase().includes(query)
            );
        }
        
        return matchesTag && matchesSearch;
    });
    
    const itemsPerPage = 6;
    const startIndex = append ? (currentPage - 1) * itemsPerPage : 0;
    const endIndex = currentPage * itemsPerPage;
    const visibleItems = filtered.slice(0, endIndex);
    const hasMore = filtered.length > endIndex;
    
    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        if (moreBtn) moreBtn.style.display = 'none';
    } else {
        if (emptyState) emptyState.style.display = 'none';
        
        const itemsHtml = visibleItems.map(item => {
            const riskKey = getDictionaryRiskKey(item.riskLevel);
            
            return `
                <div class="term-card" data-id="${item.id}">
                    <div class="term-header">
                        <div class="term-title-row">
                            <span class="term-name">${item.term}</span>
                            <span class="term-risk-badge ${riskKey}">${item.riskLevel}</span>
                        </div>
                        <span class="info-tag">${item.tag}</span>
                        <p class="term-excerpt">${item.plainExplanation}</p>
                    </div>
                    <button class="term-expand-btn">
                        展开详情
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>
                    <div class="term-content">
                        <div class="term-section">
                            <div class="term-section-title">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="16" x2="12" y2="12"></line>
                                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                                </svg>
                                通俗解释
                            </div>
                            <div class="term-section-content">${item.plainExplanation}</div>
                        </div>
                        ${item.commonScenarios && item.commonScenarios.length ? `
                        <div class="term-section">
                            <div class="term-section-title">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                常见场景
                            </div>
                            <div class="term-scenarios">
                                ${Array.isArray(item.commonScenarios) ? item.commonScenarios.map(s => `<span class="info-tag">${s}</span>`).join('') : item.commonScenarios}
                            </div>
                        </div>
                        ` : ''}
                        ${item.pddExample ? `
                        <div class="term-section">
                            <div class="term-section-title">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                </svg>
                                拼多多示例
                            </div>
                            <div class="term-section-content">${item.pddExample}</div>
                        </div>
                        ` : ''}
                        ${item.industryReference ? `
                        <div class="term-section">
                            <div class="term-section-title">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                                </svg>
                                行业参考
                            </div>
                            <div class="term-section-content">${item.industryReference}</div>
                        </div>
                        ` : ''}
                        ${item.readingTip ? `
                        <div class="term-section">
                            <div class="term-section-content term-tip">💡 ${item.readingTip}</div>
                        </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        if (append) {
            grid.insertAdjacentHTML('beforeend', itemsHtml);
        } else {
            grid.innerHTML = itemsHtml;
        }
        
        grid.querySelectorAll('.term-header').forEach(header => {
            header.addEventListener('click', function() {
                const card = this.closest('.term-card');
                const btn = card.querySelector('.term-expand-btn');
                const isExpanded = card.classList.toggle('expanded');
                
                if (btn) {
                    btn.innerHTML = isExpanded 
                        ? `收起详情 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`
                        : `展开详情 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
                }
            });
        });
        
        grid.querySelectorAll('.term-expand-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const card = this.closest('.term-card');
                const isExpanded = card.classList.toggle('expanded');
                this.innerHTML = isExpanded 
                    ? `收起详情 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`
                    : `展开详情 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
            });
        });
        
        if (moreBtn) {
            moreBtn.style.display = hasMore ? 'block' : 'none';
            const moreBtnText = moreBtn.querySelector('.btn-text');
            if (moreBtnText) {
                moreBtnText.textContent = `查看更多概念 (${endIndex}/${filtered.length})`;
            }
        }
    }
}

function initScrollAnimation() {
    const animateElements = document.querySelectorAll('.intro-card, .guide-card, .stat-card, .checklist-category, .term-card, .case-card, .section-header');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

const privacyCases = [
  {
    id: "case-login",
    title: "案例一：注册登录时，平台会识别你是谁",
    subtitle: "手机号、第三方账号、身份核验信息",
    riskLevel: "中高关注",
    riskType: "账号识别与身份验证",
    relatedChecklist: ["数据收集范围", "使用目的与必要性", "用户权利与退出机制"],
    scenario: "用户第一次使用电商 App，选择手机号注册，或使用微信、QQ 等第三方账号快捷登录。在账号找回、手机号换绑等安全场景中，平台还可能要求用户提交身份证件信息或面部信息进行身份核验。",
    involvedData: ["手机号", "短信验证码", "第三方账号头像", "第三方账号昵称", "身份证件信息", "面部信息"],
    keyQuestion: "注册登录是否只收集必要信息？身份核验是否只在账号安全场景下触发？",
    analysis: "手机号用于注册登录通常具有合理性；第三方账号登录可以提升便利性，但会形成不同平台账号之间的数据连接。身份证件信息和面部信息属于高敏感度信息，只有在账号找回、换绑、安全核验等必要场景中使用，才更符合用户预期。",
    userShouldCheck: ["是否说明手机号除了登录外还会不会用于商业短信或其他触达？", "第三方登录授权页面是否清楚展示了获取哪些信息？", "身份证件信息或面部信息是否只在必要安全场景中收集？", "是否说明身份核验信息的使用目的和保护措施？"],
    userAction: ["如果只是浏览商品，可以优先使用不登录浏览功能。", "使用第三方登录前，查看授权页面显示的信息范围。", "遇到身份证件或人脸验证时，确认是否确实为账号安全、换绑或找回所必需。", "如不再使用账号，可查看账号注销和个人信息删除路径。"],
    cardSummary: "注册登录看似简单，但它决定了平台如何识别你、联系你，以及在特殊情况下如何验证你的身份。"
  },
  {
    id: "case-transaction",
    title: "案例二：下单购物时，交易信息会连接多个主体",
    subtitle: "订单、支付、配送、商家、物流",
    riskLevel: "中关注",
    riskType: "交易履约与信息共享",
    relatedChecklist: ["数据收集范围", "第三方共享与委托处理", "跨境传输与数据存储"],
    scenario: "用户在电商平台下单购买商品，填写收货人姓名、收货地址、手机号，并选择微信支付、支付宝或平台钱包等方式完成付款。随后，商家和物流服务方需要使用配送信息完成发货和交付。",
    involvedData: ["收货人姓名", "收货地址", "收货手机号", "订单编号", "商品信息", "下单时间", "支付金额", "支付方式", "物流状态"],
    keyQuestion: "订单信息会提供给谁？支付机构、商家、物流公司分别拿到哪些必要信息？",
    analysis: "电商交易天然涉及多方协作。平台需要处理订单信息，支付机构需要处理支付信息，商家和物流主体需要处理配送信息。合理的信息流转通常围绕交易履约展开，但用户仍应关注共享对象、共享目的和共享信息范围是否清楚。",
    userShouldCheck: ["平台是否说明订单信息包括哪些具体内容？", "支付信息是否仅提供给用户选择的支付机构？", "商家是否会获得收货姓名、地址、手机号等配送必要信息？", "物流主体是否会获取与交付相关的信息？", "是否说明交易信息保存期限？"],
    userAction: ["填写收货地址时，尽量避免加入无关个人信息。", "关注平台是否支持隐私面单、号码保护等功能。", "不要在评价、晒单图片中暴露订单号、地址、手机号。", "删除前台订单记录前，理解法定交易信息可能仍需保存。"],
    cardSummary: "一次下单会产生订单、支付、配送、售后等多类信息，用户要重点看信息是否只在交易履约范围内流转。"
  },
  {
    id: "case-recommendation-ads",
    title: "案例三：浏览和购买记录，可能被用于推荐和广告",
    subtitle: "偏好特征、个性化推荐、商业短信",
    riskLevel: "高关注",
    riskType: "用户画像与营销触达",
    relatedChecklist: ["个性化推荐与广告营销", "使用目的与必要性", "用户权利与退出机制"],
    scenario: "用户经常浏览某类商品、收藏店铺、搜索关键词或购买特定商品。平台可能根据这些行为提取偏好特征，向用户推荐商品、调整展示排序、展示个性化广告，或通过手机号发送商业性短信。",
    involvedData: ["搜索记录", "浏览历史", "收藏记录", "关注关系", "订单信息", "偏好特征", "注册手机号", "收货手机号"],
    keyQuestion: "平台是否说明会基于用户行为进行个性化推荐、广告展示或商业短信推送？用户能否关闭？",
    analysis: "个性化推荐可以提升购物效率，但也可能强化平台对用户兴趣和消费偏好的判断。商业短信如果默认开启，会影响用户的选择权和安宁体验。因此，这一类条款是隐私政策阅读中的重点关注区域。",
    userShouldCheck: ["是否说明根据浏览、搜索、购买等行为提取偏好特征？", "是否说明个性化推荐会影响商品展示或排序？", "是否提供关闭个性化内容推荐的入口？", "是否提供个性化广告管理入口？", "商业性短信是否默认开启？是否提供退订方式？"],
    userAction: ["进入隐私或推荐设置，查看是否能关闭个性化推荐。", "进入广告管理页面，查看是否能管理个性化广告。", "不想接收营销短信时，通过短信退订或 App 消息设置关闭。", "定期清理搜索记录、浏览记录，减少历史行为对推荐的影响。"],
    cardSummary: "平台不仅知道你买了什么，还可能根据你看过什么、搜过什么、收藏过什么来判断你喜欢什么。"
  },
  {
    id: "case-permissions",
    title: "案例四：开启系统权限时，App 会接触更敏感的信息",
    subtitle: "位置、相册、通讯录、剪贴板、摄像头、麦克风",
    riskLevel: "高关注",
    riskType: "系统权限与敏感信息",
    relatedChecklist: ["数据收集范围", "使用目的与必要性", "用户权利与退出机制"],
    scenario: "用户使用拍照识图、晒单评价、语音客服、附近活动、好友推荐、复制口令跳转等功能时，App 可能申请摄像头、相册、麦克风、位置、通讯录、剪贴板等系统权限。",
    involvedData: ["精准位置", "粗略位置", "相册图片", "视频内容", "麦克风音频", "通讯录", "剪贴板内容", "摄像头拍摄内容"],
    keyQuestion: "权限调用是否和当前功能直接相关？不开启权限是否仍能使用基本功能？",
    analysis: "系统权限往往比普通账号信息更敏感。比如通讯录涉及他人信息，剪贴板可能包含验证码或链接，位置能反映用户行踪，相册和麦克风可能包含高度私密内容。因此，权限类条款适合设置为高关注风险卡。",
    userShouldCheck: ["平台是否提供权限申请清单？", "每项权限是否说明使用场景和目的？", "是否说明关闭权限后对功能的影响？", "通讯录、位置、相册、麦克风是否只在用户主动使用相关功能时调用？", "剪贴板内容是否仅用于识别平台相关口令、链接或分享码？"],
    userAction: ["非必要不要开启通讯录权限。", "只在使用拍照、扫码、晒单等功能时开启摄像头或相册权限。", "使用完相关功能后，可以在系统设置中关闭权限。", "如果发现频繁读取剪贴板或位置，应回到隐私政策和权限管理页核对说明。"],
    cardSummary: "权限不是越多越好。用户真正需要关注的是：这个权限是否为了当前功能所必需。"
  },
  {
    id: "case-third-party-sdk",
    title: "案例五：第三方 SDK 和合作方，可能参与处理你的信息",
    subtitle: "支付机构、商家、物流、广告分析、SDK",
    riskLevel: "高关注",
    riskType: "第三方共享与委托处理",
    relatedChecklist: ["第三方共享与委托处理", "个性化推荐与广告营销", "跨境传输与数据存储"],
    scenario: "用户在平台内支付、分享、接收推送、使用第三方登录、查看广告或完成配送时，平台可能与支付机构、商家、物流服务方、广告分析服务商或第三方 SDK 发生数据流转。",
    involvedData: ["支付信息", "订单信息", "配送信息", "设备信息", "设备标识符", "广告效果信息", "第三方账号信息"],
    keyQuestion: "第三方是谁？拿到哪些信息？用于什么目的？是否有第三方清单或 SDK 目录？",
    analysis: "第三方处理是隐私政策中最容易被忽略、但非常重要的部分。支付、物流和商家共享通常与交易履约有关；广告分析和 SDK 则可能涉及设备标识符、广告效果分析、推送服务、登录分享等场景。",
    userShouldCheck: ["是否有信息共享清单？", "是否列明信息接收方、使用目的、共享信息类型和共享方式？", "是否有第三方 SDK 目录？", "SDK 目录是否说明 SDK 名称、运营方、用途、处理信息类型和隐私政策链接？", "广告分析合作伙伴是否会处理用户行为或设备相关信息？"],
    userAction: ["阅读隐私政策时不要跳过附件、共享清单和 SDK 目录。", "看到广告、分析、推送类 SDK 时，重点查看它是否处理设备标识符。", "如果不需要第三方登录或分享，可以减少相关授权。", "关注 App 是否提供个性化广告管理或权限关闭入口。"],
    cardSummary: "隐私政策不只要看平台自己做什么，还要看它把哪些数据交给了哪些合作方。"
  },
  {
    id: "case-user-rights",
    title: "案例六：你能不能查、改、删、撤回和注销",
    subtitle: "用户权利与退出机制",
    riskLevel: "中关注",
    riskType: "个人信息控制权",
    relatedChecklist: ["用户权利与退出机制", "跨境传输与数据存储", "个性化推荐与广告营销"],
    scenario: "用户想查看平台收集了哪些个人信息，清除搜索记录、删除浏览记录、下载个人信息、关闭个性化推荐、撤回系统权限，或在不再使用平台时注销账号。",
    involvedData: ["账户资料", "搜索记录", "浏览记录", "订单记录", "发布内容", "个人信息收集清单", "授权记录", "账号信息"],
    keyQuestion: "平台是否提供清楚的用户权利入口？用户能否实际控制自己的数据？",
    analysis: "一份较完整的隐私政策，不应只说明平台收集什么，还应说明用户如何管理自己的信息。查阅、更正、复制、删除、撤回同意、关闭权限、注销账号和投诉联系，是用户重新获得数据控制感的重要路径。",
    userShouldCheck: ["是否提供查阅、更正、补充个人信息的路径？", "是否可以清除搜索记录、浏览记录或删除发布内容？", "是否可以导出或复制个人信息？", "是否可以删除个人信息或申请删除？", "是否可以关闭权限、撤回同意、注销账号？", "是否说明响应用户请求的时限和投诉渠道？"],
    userAction: ["定期查看个人信息收集清单。", "清理不需要的搜索记录、浏览记录和公开发布内容。", "关闭不必要的系统权限和个性化推荐。", "不再使用平台时，查看账号注销条件和注销后信息处理方式。", "如权益受损，保存沟通记录并通过客服、隐私邮箱或投诉渠道联系平台。"],
    cardSummary: "隐私政策的最后一步，是看用户有没有真正的退出机制和控制入口。"
  }
];

function getCaseRiskKey(riskLevel) {
    const map = {
        '高关注': 'high',
        '中关注': 'medium',
        '低关注': 'low',
        '中高关注': 'medium'
    };
    return map[riskLevel] || 'medium';
}

function initCases() {
    const grid = document.getElementById('casesGrid');
    if (!grid) return;
    
    grid.innerHTML = privacyCases.map(item => {
        const riskKey = getCaseRiskKey(item.riskLevel);
        
        return `
            <article class="case-card" data-id="${item.id}">
                <div class="case-header">
                    <div class="case-title-row">
                        <h3 class="case-title">${item.title}</h3>
                        <span class="case-risk-badge ${riskKey}">${item.riskLevel}</span>
                    </div>
                    <p class="case-subtitle">${item.subtitle}</p>
                    <div class="case-meta">
                        <span class="info-tag">${item.riskType}</span>
                    </div>
                </div>
                <div class="case-summary">
                    <p>${item.cardSummary}</p>
                </div>
                <div class="case-footer">
                    <button class="case-btn" data-case-id="${item.id}">
                        查看案例
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </article>
        `;
    }).join('');
    
    grid.querySelectorAll('.case-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const caseId = this.dataset.caseId;
            openCaseModal(caseId);
        });
    });
    
    initCaseModal();
}

function openCaseModal(caseId) {
    const caseData = privacyCases.find(c => c.id === caseId);
    if (!caseData) return;
    
    const modal = document.getElementById('caseModal');
    const titleEl = document.getElementById('caseModalTitle');
    const subtitleEl = document.getElementById('caseModalSubtitle');
    const bodyEl = document.getElementById('caseModalBody');
    
    titleEl.textContent = caseData.title;
    subtitleEl.innerHTML = `<span class="case-risk-badge ${getCaseRiskKey(caseData.riskLevel)}">${caseData.riskLevel}</span> · ${caseData.riskType}`;
    
    const involvedDataHtml = Array.isArray(caseData.involvedData) 
        ? caseData.involvedData.map(d => `<span class="data-tag">${d}</span>`).join('')
        : caseData.involvedData;
    
    bodyEl.innerHTML = `
        <div class="case-section">
            <div class="case-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                使用场景
            </div>
            <div class="case-section-content">${caseData.scenario}</div>
        </div>
        
        <div class="case-section">
            <div class="case-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
                涉及信息
            </div>
            <div class="case-involved-data">${involvedDataHtml}</div>
        </div>
        
        <div class="case-section">
            <div class="case-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                核心问题
            </div>
            <div class="case-key-question">${caseData.keyQuestion}</div>
        </div>
        
        <div class="case-section">
            <div class="case-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                风险分析
            </div>
            <div class="case-section-content">${caseData.analysis}</div>
        </div>
        
        <div class="case-section">
            <div class="case-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 11 12 14 22 4"></polyline>
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
                用户应重点查看
            </div>
            <ul class="case-list">
                ${caseData.userShouldCheck.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
        
        <div class="case-section">
            <div class="case-section-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                用户可以怎么做
            </div>
            <ul class="case-list action">
                ${caseData.userAction.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function initCaseModal() {
    const modal = document.getElementById('caseModal');
    const overlay = document.getElementById('caseModalOverlay');
    const closeBtn = document.getElementById('caseModalClose');
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}
