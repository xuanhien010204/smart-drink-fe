Frontend Specification & Fake Data — SmartDrink Kiosk (FE)
Generated from project spec. See source: SWD392 project document. fileciteturn1file1

1. Goal
A complete frontend-ready deliverable that contains: - Full list of UI pages and components - Routes and user flows (Customer, Admin, Staff) - API contract (endpoints + sample request/response) - State shape / store design (Vuex or Redux) - UI behavior rules and validation - Mock (fake) data files to seed the frontend during development - Testing checklist and sample test data
This enables building a full src/ for web kiosk + admin portal.
2. Folder / Project structure (suggested)
src/
  api/                # API client wrappers
  assets/             # images, icons, placeholders
  components/         # reusable components (Button, Modal, Card)
  pages/              # route pages (Kiosk, Admin, Login,...)
  store/              # Vuex or Redux modules
  routes/             # route definitions
  services/           # auth, payment, face-recognition stubs
  mocks/              # fake data JSON used by msw or json-server
  utils/              # helpers, validators
  styles/             # tailwind / global css
  App.vue / index.js
3. Pages & responsibilities
Kiosk (customer-facing) - Home / Welcome (shows recommendations after face-recognition) - Menu (category listing, search, filters) - Product detail (nutrition, allergens, customize) - Cart / Checkout (apply promo, select payment) - Payment (QR / Mock gateway flow) - Order Status / Receipt (show order code and estimated time) - Profile (if recognized) — quick reorder, history - Face consent & manual login fallback
Admin portal (web) - Login / Users management - Dashboard (daily sales summary, best selling) - Menu management (CRUD products, variants, categories) - Promotions & loyalty management - Inventory view - Kiosk management (list, status, sessions) - Audit & logs
4. Components list (reusable)
TopNav, SideNav, Footer
ProductCard, ProductList, CategoryFilter
VariantSelector (size/ice/sugar)
CartSummary, CartItem
PromoInput, WalletBalanceBadge
FaceScanModal (camera placeholder for dev)
PaymentQRModal, OrderStatusTicker
Table, Form, ConfirmDialog
5. Routing (example)
/                -> KioskHome
/menu            -> MenuPage
/product/:id     -> ProductDetail
/cart            -> CartPage
/checkout        -> Checkout
/order/:code     -> OrderStatus
/admin           -> AdminDashboard (protected)
/admin/products  -> ProductListAdmin
/admin/promos    -> Promotions
6. API contract (minimal set to implement FE)
NOTE: use these mocked endpoints during dev. Backend will match DB schema in spec. fileciteturn1file1
Auth
POST /api/auth/login — {email,password} -> {accessToken, refreshToken, user}
POST /api/auth/refresh — {refreshToken} -> {accessToken}
Catalog
GET /api/categories -> [{category_id, name, image_url}]
GET /api/products?category=&q=&tags= -> [{product fields…}]
GET /api/products/:id -> product detail (includes variants)
Orders
POST /api/orders -> create order -> {order_id, order_code, status}
GET /api/orders/:order_id or GET /api/orders/code/:order_code
POST /api/orders/:order_id/pay -> triggers payment flow
Payments (mock)
POST /api/payments/qr -> returns {qr_code_url, expires_at, transaction_id}
GET /api/payments/:transaction_id/status -> {status}
Promotions / Loyalty
GET /api/promotions -> list active promotions
POST /api/promotions/validate -> {code, cartAmount} -> {valid, discountAmount}
GET /api/wallet/:user_id -> {balance}
Kiosk / Face
POST /api/kiosk/face/recognize -> receives face data (dev: send mock id) -> {user_id, confidence}
POST /api/kiosk/interactions -> logs event
Admin endpoints
CRUD endpoints for products, categories, promotions, inventory, kiosks.
7. Store (state) shape (example for Vuex/Redux)
auth: { user: {}, accessToken: '', refreshToken: '' }
catalog: {
  categories: [],
  products: { byId: {}, allIds: [] },
  productFilters: { category, q, tags }
}
cart: {
  items: [ {productId, name, qty, unit_price, variants, subtotal} ],
  promo: null,
  subtotal, total
}
kioskSession: { kioskId, recognizedUser, faceConfidence }
ui: { loadingFlags, notifications }
admin: { reports, products, promotions }
8. UI rules & validations (important)
Prevent checkout if item out of stock (inventory check on add-to-cart and on checkout). BR-INV-14. fileciteturn1file14
Only one primary percent promotion applied; system chooses best promotion if multiple. BR-PROMO-07. fileciteturn1file14
Loyalty points applied only after confirmed payment. BR-LP-09. fileciteturn1file14
Face recognition requires explicit consent before storing biometric data. BR-PRIV-01. fileciteturn1file16
9. Mock data (in mocks/ as JSON) — samples included below
Note: these JSON objects are ready to paste as files mocks/categories.json, mocks/products.json, mocks/users.json, mocks/orders.json, mocks/promotions.json.
mocks/categories.json
[{
  "category_id": "c1",
  "name": "Coffee",
  "image_url": "/assets/cat-coffee.png"
},{
  "category_id": "c2",
  "name": "Tea",
  "image_url": "/assets/cat-tea.png"
}]
mocks/products.json (3 sample products)
[{
  "product_id": "p-espresso",
  "category_id": "c1",
  "name": "Espresso",
  "base_price": 20000,
  "image_url": "/assets/espresso.png",
  "is_available": true,
  "calories": 5,
  "preparation_time": 60,
  "tags": ["hot"],
  "ingredients": {"coffee": "20g"},
  "variants": [
    {"variant_id":"v-s","variant_name":"S","variant_type":"SIZE","price_adjustment":0},
    {"variant_id":"v-m","variant_name":"M","variant_type":"SIZE","price_adjustment":5000}
  ]
},
{
  "product_id": "p-milk-tea",
  "category_id": "c2",
  "name": "Milk Tea",
  "base_price": 30000,
  "is_available": true,
  "tags": ["cold","sweet"],
  "preparation_time": 90
}]
mocks/users.json
[{
  "user_id": "u-demo-1",
  "email": "demo.customer@example.com",
  "full_name": "Nguyen Van A",
  "role": "CUSTOMER",
  "is_verified": true,
  "created_at": "2025-09-01T08:00:00Z"
}]
mocks/promotions.json
[{
  "promotion_id":"promo-10",
  "code":"WELCOME10",
  "promotion_type":"PERCENTAGE",
  "discount_value":10,
  "start_date":"2025-01-01T00:00:00Z",
  "end_date":"2026-01-01T00:00:00Z",
  "is_active":true
}]
mocks/orders.json (example order created by FE)
[{
  "order_id":"o-001",
  "order_code":"SD-2025001",
  "customer_id":"u-demo-1",
  "order_status":"PENDING",
  "subtotal":50000,
  "total_amount":50000,
  "created_at":"2025-09-10T07:30:00Z"
}]
10. How to use mocks during dev
Option A: run json-server --watch mocks --port 4000 and proxy /api to localhost:4000
Option B: use msw (Mock Service Worker) with above JSON payloads
11. Accessibility & Performance notes
Keep images optimized; preload critical assets (logo, top product images)
UI must respond within 2s for recommendation flows (NF-03). fileciteturn1file4
Provide large touch targets for kiosk; keyboard navigation for admin.
12. Testing checklist
Unit tests for components (cart math, promo application) — include edge cases: stacking promo, loyalty redemption limits.
Integration: create order -> mock payment -> order status update.
E2E: walk through kiosk flow with face-recognition stub -> add to cart -> pay -> receive order.
13. Next deliverables I can generate for you
Full src/ scaffold (React + Vite or Vue 3 + Vite) with components and routes wired to mocks
Storybook stories for main components
Postman collection for mocked endpoints

Document generated using SWD392 project spec. fileciteturn1file0