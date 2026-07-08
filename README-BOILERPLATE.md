# ReactRTU - Senior-Level React Boilerplate

A production-ready React + TypeScript boilerplate with senior-level architecture, reusable components, custom hooks, and scalable patterns. Built for high-performance, maintainable, and enterprise-ready applications.

## 🚀 Features

### Core Infrastructure
- **Type-Safe API Client**: Axios with interceptors, token refresh, and error handling
- **Error Handling**: Custom error classes for all HTTP status codes and application states
- **Environment Config**: Centralized configuration management from import.meta.env
- **Service Layer**: Encapsulated business logic with auth, user, and API services

### State Management
- **Zustand Stores**: Lightweight auth and UI state management with persistence
- **React Query**: Server state management with built-in caching and retry logic
- **Context API**: Authentication context with token validation and user data

### Reusable Hooks (10+ Custom Hooks)
- `useAsync` - Manage async operations with loading/error states
- `useFetch` - Data fetching wrapper with React Query integration
- `useLocalStorage` / `useSessionStorage` - Persistent state management
- `useNotification` - Toast and notification system with Sonner
- `useDebounce` / `useThrottle` - Input throttling and debouncing
- `usePagination` - Client-side pagination logic
- `useClickOutside` - Detect outside clicks
- `useMediaQuery` - Responsive breakpoint detection
- `useIsMounted` - Safe component mount state
- `usePrevious` - Previous value tracking

### Utility Functions (50+ Utilities)
- **Formatters**: `formatDate`, `formatCurrency`, `formatFileSize`, `formatPercent`
- **String Utilities**: `capitalize`, `truncate`, `slugify`, `camelCase`, `kebabCase`, `snakeCase`
- **Validators**: `isEmail`, `isUrl`, `isPhoneNumber`, `isStrongPassword`, `isEmpty`
- **Object/Array**: `deepClone`, `merge`, `pick`, `omit`, `groupBy`, `chunk`, `flatten`, `unique`
- **Promise Utilities**: `sleep`, `retry`, `timeout`, `waitFor`, `debouncePromise`, `throttlePromise`
- **Storage Helpers**: `setStorageItem`, `getStorageItem`, `removeStorageItem` with expiration

### Reusable Components
- **Data Display**: `DataTable`, `Pagination`, `Breadcrumb`, `Container`
- **Feedback**: `LoadingSpinner`, `EmptyState`, `ErrorBoundary`
- **Forms**: `CustomButton`, `CustomInput`, `LoginForm`
- **UI**: Button, Input, Card, Dialog, Dropdown Menu, Label, Separator, Avatar, Skeleton

### Architecture Patterns
- ✅ Feature-based folder structure
- ✅ Separation of concerns (API, Services, Components, Hooks, Utils)
- ✅ Centralized error handling with custom error classes
- ✅ Request/response interceptors for auth token management
- ✅ Type safety throughout (no `any` types)
- ✅ Reusable component patterns with CVA variants
- ✅ Data slot pattern for compound components
- ✅ Custom hook composition for business logic

## 📁 Project Structure

```
src/
├── api/                # HTTP client and endpoints
│   ├── client.ts       # Axios instance with interceptors
│   ├── endpoints.ts    # API route constants
│   ├── types.ts        # API request/response types
│   └── index.ts        # Exports
├── components/         # Reusable React components
│   ├── auth/          # Authentication components
│   ├── common/        # Shared components (Table, Pagination, etc.)
│   ├── custom/        # Custom form components
│   ├── feedback/      # Feedback components (toast, alerts)
│   ├── forms/         # Complex form components
│   ├── layout/        # Layout components
│   └── ui/            # shadcn UI components
├── config/             # Application configuration
│   ├── env.ts         # Environment variables
│   ├── query-client.ts # React Query setup
│   └── theme.ts       # Theme tokens and colors
├── constants/          # App-wide constants
│   └── app.ts         # App config, regex, messages, query keys
├── errors/             # Error handling
│   ├── AppError.ts    # Custom error classes
│   └── handlers.ts    # Error utilities and formatters
├── hooks/              # Custom React hooks
│   ├── useAuth.ts     # Auth context hook
│   ├── useAsync.ts    # Async operation handler
│   ├── useStorage.ts  # Local/session storage
│   ├── useNotification.ts # Toast notifications
│   ├── useDebounce.ts # Debounce/throttle/pagination
│   ├── useDom.ts      # DOM interaction hooks
│   └── index.ts       # Exports
├── lib/                # Utility libraries
│   └── utils.ts       # cn() classname helper
├── pages/              # Page components
│   ├── Auth/          # Authentication pages
│   ├── WebPanel/      # Admin dashboard pages
│   └── Website/       # Public website pages
├── providers/          # Context providers
│   ├── AuthProvider.tsx    # Authentication
│   ├── QueryProvider.tsx   # React Query
│   ├── ThemeProvider.tsx   # Theme switching
│   └── index.tsx           # Provider composition
├── routes/             # Routing configuration
│   ├── index.tsx       # Router setup
│   ├── routes.config.tsx # Route definitions
│   ├── route-paths.ts  # Route constants
│   ├── RouteGuard.tsx  # Auth protection
│   ├── types.ts        # Route types
│   └── ProtectedRoute.tsx # Protected route wrapper
├── services/           # Business logic layer
│   ├── api.service.ts  # Generic API wrapper
│   ├── auth.service.ts # Authentication service
│   ├── user.service.ts # User management service
│   └── index.ts        # Exports
├── store/              # Zustand state stores
│   ├── auth.store.ts   # Auth state
│   ├── ui.store.ts     # UI state (theme, sidebar, notifications)
│   └── index.ts        # Exports
├── styles/             # Global styles
├── types/              # TypeScript types
│   ├── api.ts          # API types (ApiResponse, User, etc.)
│   ├── entities.ts     # Domain models
│   ├── auth.types.ts   # Auth form types
│   └── index.ts        # Centralized exports
├── utils/              # Utility functions
│   ├── formatters.ts   # Date, currency, file size formatting
│   ├── string.ts       # String manipulation
│   ├── validation.ts   # Validators
│   ├── object.ts       # Object/array utilities
│   ├── promise.ts      # Promise utilities
│   ├── storage.ts      # Storage helpers
│   ├── cn.ts           # Classname helper
│   └── index.ts        # Exports
├── validations/        # Zod validation schemas
│   └── auth.schema.ts  # Form validation schemas
├── App.tsx             # Root component
├── main.tsx            # Entry point
└── index.html          # HTML template
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=ReactRTU
VITE_APP_VERSION=1.0.0
VITE_ENV=development
```

### API Configuration

The API client automatically:
- Attaches auth tokens to requests via Authorization header
- Handles token refresh on 401 responses
- Transforms errors to custom error classes
- Retries failed requests with exponential backoff

## 🎯 Key Patterns

### API Service Usage

```typescript
import { userService } from '@/services/user.service';

// Get users with pagination
const users = await userService.listUsers({ page: 1, pageSize: 10 });

// Create user
const newUser = await userService.createUser({
  email: 'user@example.com',
  name: 'John Doe',
});
```

### Using Custom Hooks

```typescript
// Async operations
const { data, isLoading, isError, error, execute } = useAsync(
  () => userService.getProfile(),
  true
);

// Debounced search
const searchQuery = useDebounce(inputValue, 300);

// Notifications
const { success, error, warning } = useNotification();
success('Profile updated!');

// Pagination
const pagination = usePagination(totalItems, itemsPerPage);
```

### State Management

```typescript
// Auth store
const { user, token, isAuthenticated } = useAuthStore();

// UI store
const { theme, sidebarOpen, addNotification } = useUiStore();
const toggleTheme = () => useUiStore.setState({ theme: newTheme });
```

### Component Usage

```typescript
// DataTable with columns
<DataTable
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'status', header: 'Status', 
      render: (item, status) => <Badge>{status}</Badge> 
    },
  ]}
  data={users}
  isLoading={loading}
  emptyMessage="No users"
/>

// Pagination
<Pagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
/>
```

## 🚀 Getting Started

### Installation

```bash
# Clone or download the boilerplate
cd reactrtu

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development server
npm run dev
```

### Building for Production

```bash
npm run build

# Preview production build
npm run preview
```

### Linting & Formatting

```bash
npm run lint
npm run format
```

## 📦 Tech Stack

- **React 19** - UI framework with automatic batching
- **TypeScript 6** - Type safety and IDE support
- **Vite 8** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn/ui** - High-quality React components
- **React Router 7** - Client-side routing with loaders
- **React Hook Form 7** - Performant form handling
- **Zod 4** - Schema validation
- **Zustand 5** - Lightweight state management
- **React Query 5** - Server state management
- **Axios 1** - HTTP client
- **Sonner 2** - Toast notifications
- **Lucide React** - Icon library
- **MDN Web Docs** - Web standards reference

## ✨ Code Quality

- ✅ Strict TypeScript mode enabled
- ✅ No `any` types - fully typed codebase
- ✅ ESLint + Prettier configured
- ✅ Git hooks with Husky + lint-staged
- ✅ Testing setup with Vitest + React Testing Library

## 🎓 Best Practices Implemented

1. **Separation of Concerns** - API, Services, Components, Hooks, Utils
2. **Type Safety** - Comprehensive TypeScript typing throughout
3. **Error Handling** - Custom error classes with proper hierarchy
4. **DRY Principle** - Reusable components, hooks, and utilities
5. **Performance** - React Query caching, memoization, code splitting
6. **Accessibility** - Semantic HTML, ARIA labels, keyboard support
7. **Code Organization** - Feature-based folder structure
8. **Documentation** - Clear code patterns and examples

## 📚 Documentation

- [Architecture Guide](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Component Library](./docs/components.md)
- [Hooks Guide](./docs/hooks.md)
- [State Management](./docs/state-management.md)

## 🔐 Authentication Flow

1. User submits login form
2. `authService.login()` calls API endpoint
3. API returns user data and token
4. Token stored in localStorage and Zustand store
5. AuthProvider updates context
6. RouteGuard checks authentication
7. User redirected to dashboard
8. Token automatically attached to API requests
9. On 401, token refresh attempted
10. if refresh fails, user logged out and redirected to login

## 🐛 Error Handling

Custom error classes for:
- `AppError` - Base error class
- `ValidationError` - Form validation errors
- `ApiError` - HTTP API errors
- `AuthError` - Authentication errors
- `UnauthorizedError` - 401 Unauthorized
- `ForbiddenError` - 403 Forbidden
- `NotFoundError` - 404 Not Found
- `ConflictError` - 409 Conflict
- `NetworkError` - Network connectivity errors

## 🚀 Performance Optimizations

- Code splitting with React Router route-level splitting
- React Query caching with 5-minute stale time
- Memoized components and hooks
- Virtual scrolling ready for large lists
- Image optimization patterns
- CSS-in-JS with Tailwind JIT mode

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Follow the established patterns and submit PRs.

---

**Built with ❤️ for building scalable React applications**
