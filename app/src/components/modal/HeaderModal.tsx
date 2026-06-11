'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

import { cityT, useCity } from '@/app/src/store/cityStore';
import { ToFarsi } from '@/app/src/util/turnToFarsi';

interface City {
  id: string;
  name: cityT;
  label: string;
}

interface CitySelectorProps {
  className?: string;
  iconSize?: number;
  showArrow?: boolean;
  onCityChange?: (city: City) => void;
}

export default function CitySelector({
  className = '',
  iconSize = 18,
  showArrow = true,
  onCityChange,
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { city, setCity } = useCity();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/city');

        if (!res.ok) {
          throw new Error('Failed to fetch cities');
        }

        const data: City[] = await res.json();

        setCities(data);
        setError(null);
      } catch (err) {
        setError('خطا در بارگذاری شهرها');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCities = useMemo(() => {
    if (!searchTerm.trim()) {
      return cities;
    }

    return cities.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cities, searchTerm]);

  const handleSelectCity = (selectedCity: City) => {
    setCity(selectedCity.name);

    onCityChange?.(selectedCity);

    setIsOpen(false);
    setSearchTerm('');
  };

  const displayCityName = city
    ? ToFarsi(city)
    : 'انتخاب شهر';

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen((prev) => !prev)}
        className={className}
      >
        <MapPin size={iconSize} />

        <span>
          {loading ? '...' : displayCityName}
        </span>

        {showArrow && (
          <ChevronDown size={iconSize - 2} />
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div
            ref={dropdownRef}
            className="w-72 rounded-xl border border-zinc-800 bg-background shadow-2xl overflow-hidden"
          >
            {error && (
              <div className="p-3 text-sm text-red-500">
                {error}
              </div>
            )}

            <input
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full border-b border-zinc-800 bg-transparent px-4 py-3 outline-none"
              placeholder="جستجوی شهر..."
            />

            <div className="max-h-64 overflow-y-auto">
              {!error && loading && (
                <div className="p-4 text-center text-sm text-zinc-400">
                  در حال دریافت شهرها...
                </div>
              )}

              {!error &&
                !loading &&
                filteredCities.length === 0 && (
                  <div className="p-4 text-center text-sm text-zinc-400">
                    شهری پیدا نشد
                  </div>
                )}

              {!error &&
                !loading &&
                filteredCities.map((c) => (
                  <button
                    key={c.id}
                    onClick={() =>
                      handleSelectCity(c)
                    }
                    className="block w-full px-4 py-3 text-right transition hover:bg-zinc-800"
                  >
                    {c.label}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}