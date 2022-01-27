namespace :load do
  task :defaults do
    set :wordpress_wpcfm, false
  end
end

namespace :wpcli do
  task :dbexport do
    on roles(:db) do
      if test " [ -f #{current_path}/#{fetch(:app_webroot, 'web')}/wp-config.php ]"
        unless test " [ -f #{release_path}/db.sql ]"
          within "#{release_path}/#{fetch(:app_webroot, 'web')}" do
            execute :wp, "db export", "#{release_path}/db.sql"
          end

          within "#{release_path}/#{fetch(:app_webroot, 'web')}" do
            execute :gzip, "#{release_path}/db.sql"
          end
        end
      end
    end
  end

  namespace :wpcfm do
    desc "Activate WP-CFM plugin"
    task :activate do
      on roles(:db) do
        within "#{release_path}/#{fetch(:app_webroot, 'web')}" do
          execute :wp, "plugin", "activate", "wp-cfm"
        end
      end
    end

    desc "Pull all configuration"
    task :pull do
      on roles(:db) do
        within "#{release_path}/#{fetch(:app_webroot, 'web')}" do
          execute :wp, "config", "pull all"
        end
      end
    end
  end

  task :update do
    if fetch(:wordpress_wpcfm)
      sh("#{:wp}", "plugin", "is-installed", "wp-cfm") do
        invoke "wpcli:wpcfm:activate"
        invoke "wpcli:wpcfm:pull"
      end
    end
  end

  desc "Refreshes the salts defined in the wp-config.php file."
  task :shuffle_salts do
    on roles(:db) do
      within "#{release_path}/#{fetch(:app_webroot, 'web')}" do
        execute :wp, "config", "shuffle-salts"
      end
    end
  end
end
