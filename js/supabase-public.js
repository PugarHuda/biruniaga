// Supabase Public Config
const { createClient } = supabase;
var db = createClient(
    'https://xjnlgscroleykailitat.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhqbmxnc2Nyb2xleWthaWxpdGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNTgzOTEsImV4cCI6MjA4NjczNDM5MX0.STViYUShxpdL-Z0RbNuNT-4HvxeO8uP74QlCNNHnHrw'
);

// Global settings cache
var siteSettings = {};

// Load site settings
async function loadSiteSettings() {
    try {
        const { data, error } = await db.from('site_settings').select('key, value');
        if (!error && data) {
            data.forEach(function(item) {
                siteSettings[item.key] = item.value;
            });
        }
    } catch (e) {
        console.error('Failed to load site settings:', e);
    }
}

// Get setting value
function getSetting(key, defaultValue) {
    return siteSettings[key] || defaultValue || '';
}

function formatPrice(price) {
    return 'Rp ' + Number(price).toLocaleString('id-ID');
}

// Load settings on page load
loadSiteSettings();
