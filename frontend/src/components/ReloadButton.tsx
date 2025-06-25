import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { RefreshCw } from 'lucide-react';

interface ReloadButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

/**
 * A button component that reloads the current page when clicked
 */
const ReloadButton: React.FC<ReloadButtonProps> = ({ 
  variant = 'default',
  size = 'default',
  className 
}) => {
  const handleReload = () => {
    // Reload the current page
    window.location.reload();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleReload}
      className={cn('transition-all', className)}
      title="Reload page"
    >
      {size === 'icon' ? (
        <RefreshCw className="h-4 w-4" />
      ) : (
        <>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reload
        </>
      )}
    </Button>
  );
};

export default ReloadButton;