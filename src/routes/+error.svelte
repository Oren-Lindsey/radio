<script>
    import { page } from '$app/stores';
  </script>
  
  <h1 class="grid place-items-center h-screen w-screen bg-gray-600 text-white">{$page.status}: {$page.error.message}</h1>