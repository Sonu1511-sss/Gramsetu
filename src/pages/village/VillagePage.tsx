import { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Home,
  Building,
  School,
  HeartPulse,
  Droplets,
  Lightbulb,
  Trees,
  CheckCircle2,
  FolderGit2,
  AlertCircle,
  Landmark,
  Compass
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { panchayatService } from '../../services/panchayatService';
import { VillageProfile } from '../../types';
import { useLanguage } from '../../hooks/useLanguage';
import { formatNumberIN } from '../../utils/formatters';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { StatusBadge } from '../../components/common/StatusBadge';

export function VillagePage() {
  const [profile, setProfile] = useState<VillageProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedWard, setSelectedWard] = useState<number | null>(4); // default Ward 04

  const { lang } = useLanguage();

  useEffect(() => {
    async function load() {
      const data = await panchayatService.getVillageProfile();
      setProfile(data);
      setLoading(false);
    }
    load();
  }, []);

  if (!profile) return null;

  const demographicData = [
    { name: 'Male Adults', value: profile.malePopulation, color: '#1769AA' },
    { name: 'Female Adults', value: profile.femalePopulation, color: '#16865B' },
    { name: 'Children (< 14)', value: profile.childrenPopulation, color: '#F59E0B' },
    { name: 'Senior Citizens (60+)', value: profile.seniorCitizens, color: '#8B5CF6' }
  ];

  const landUseData = [
    { name: 'Agricultural', acres: profile.landUse.agriculturalLandAcres, color: '#16865B' },
    { name: 'Forest Cover', acres: profile.landUse.forestCoverAcres, color: '#0F766E' },
    { name: 'Residential', acres: profile.landUse.residentialAcres, color: '#F59E0B' },
    { name: 'Water Bodies', acres: profile.landUse.waterBodiesAcres, color: '#0284C7' }
  ];

  const activeWard = profile.wardDetails.find((w) => w.wardNumber === selectedWard);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title={lang === 'hi' ? 'ग्राम प्रोफाइल एवं वार्ड विवरण' : 'Village Profile & Infrastructure'}
        description="Comprehensive demographic statistics, civic infrastructure census, land use and ward-level details for Rampur Gram Panchayat"
        statusBadge={
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-[#1769AA]">
            Waraseoni Block • Balaghat District
          </span>
        }
      />

      {/* Main Village At-a-Glance Banner */}
      <div className="bg-[#0F2747] text-white p-6 rounded-xl border border-blue-900/40 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 text-xs">
          <div>
            <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">Gram Panchayat</div>
            <div className="text-base font-bold text-white mt-1">{profile.gramPanchayat}</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Tehsil: {profile.block}</div>
          </div>
          <div>
            <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">District & State</div>
            <div className="text-base font-bold text-white mt-1">{profile.district}</div>
            <div className="text-[11px] text-blue-200 mt-0.5">{profile.state} (PIN {profile.pincode})</div>
          </div>
          <div>
            <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">Total Population</div>
            <div className="text-2xl font-bold text-amber-300 mt-1">{formatNumberIN(profile.totalPopulation)}</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Across 12 Wards</div>
          </div>
          <div>
            <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">Total Households</div>
            <div className="text-2xl font-bold text-emerald-300 mt-1">{formatNumberIN(profile.totalHouseholds)}</div>
            <div className="text-[11px] text-blue-200 mt-0.5">412 BPL / Priority</div>
          </div>
          <div>
            <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">Literacy Rate</div>
            <div className="text-2xl font-bold text-cyan-300 mt-1">{profile.literacyRate}%</div>
            <div className="text-[11px] text-blue-200 mt-0.5">4 Schools & 6 Anganwadis</div>
          </div>
          <div>
            <div className="text-gray-400 font-medium text-[11px] uppercase tracking-wider">Elected Sarpanch</div>
            <div className="text-sm font-bold text-white mt-1">{profile.sarpanchName}</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Secretary: {profile.secretaryName}</div>
          </div>
        </div>
      </div>

      {/* Facilities Grid: 5 Public Assets */}
      <div>
        <h2 className="text-sm font-bold text-[#17212B] mb-3 flex items-center gap-2">
          <Building className="w-4 h-4 text-[#1769AA]" />
          <span>Civic & Public Infrastructure Assets</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-blue-50 text-[#1769AA]">
                <School className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#17212B]">{profile.facilities.schools}</div>
                <div className="text-xs text-[#667085]">Govt. Schools</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-pink-50 text-pink-700">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#17212B]">{profile.facilities.anganwadiCentres}</div>
                <div className="text-xs text-[#667085]">Anganwadi Centres</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-emerald-50 text-[#16865B]">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#17212B]">{profile.facilities.subHealthCentre}</div>
                <div className="text-xs text-[#667085]">Arogya Mandir (PHC)</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-cyan-50 text-cyan-700">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#17212B]">{profile.facilities.waterTanks} Tanks</div>
                <div className="text-xs text-[#667085]">{profile.facilities.tubeWells} Tube Wells</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-[#17212B]">{profile.facilities.streetLights}</div>
                <div className="text-xs text-[#667085]">LED Street Lights</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demographics & Land Use Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demographics Pie */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Demographic Distribution</CardTitle>
            <p className="text-xs text-[#667085]">Total Population: 8,420 citizens (Census 2026 update)</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={demographicData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {demographicData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Land Use Bar */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Geographical Land Use (Acres)</CardTitle>
            <p className="text-xs text-[#667085]">Total Revenue Area: 1,775 Acres</p>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={landUseData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E4E7EC" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#667085' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#667085' }} />
                  <Tooltip />
                  <Bar dataKey="acres" name="Acres" fill="#16865B" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ward-wise Interactive Grid & Map Inspector */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
          <div>
            <CardTitle>Ward-wise Demographic & Works Grid (12 Wards)</CardTitle>
            <p className="text-xs text-[#667085] mt-0.5">
              Select any Ward to inspect elected Panch, demographic density and active public works
            </p>
          </div>
          <span className="text-xs font-semibold text-[#1769AA] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Selected: Ward 0{selectedWard}
          </span>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* 12 Ward Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-xs">
            {profile.wardDetails.map((w) => (
              <button
                key={w.wardNumber}
                onClick={() => setSelectedWard(w.wardNumber)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  selectedWard === w.wardNumber
                    ? 'border-[#1769AA] bg-blue-50/70 ring-2 ring-blue-100 shadow-xs'
                    : 'border-[#E4E7EC] hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#17212B]">
                    Ward {w.wardNumber.toString().padStart(2, '0')}
                  </span>
                  {w.openComplaints > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#DC3545]" title="Open complaints active" />
                  )}
                </div>
                <div className="text-xs text-[#667085] truncate mt-1">{w.wardName.split('-')[1]}</div>
                <div className="text-[11px] text-[#667085] mt-1 font-medium">{w.population} Citizens</div>
              </button>
            ))}
          </div>

          {/* Ward Inspector Detail Card */}
          {activeWard && (
            <div className="p-5 bg-[#F5F7FA] rounded-xl border border-[#E4E7EC] text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
              <div>
                <div className="text-[11px] text-[#667085] uppercase font-bold tracking-wider">Ward Area</div>
                <div className="font-bold text-[#17212B] text-sm mt-0.5">{activeWard.wardName}</div>
                <div className="text-[#667085] mt-1">Elected Panch: <strong className="text-[#17212B]">{activeWard.panchName}</strong></div>
              </div>

              <div>
                <div className="text-[11px] text-[#667085] uppercase font-bold tracking-wider">Households & Residents</div>
                <div className="font-bold text-[#17212B] text-sm mt-0.5">{activeWard.households} Households</div>
                <div className="text-[#667085] mt-1">{activeWard.population} Total Citizens</div>
              </div>

              <div>
                <div className="text-[11px] text-[#667085] uppercase font-bold tracking-wider">Active Projects</div>
                <div className="font-bold text-[#16865B] text-sm mt-0.5">{activeWard.activeProjects} Works Ongoing</div>
                <div className="text-[#667085] mt-1">Funded under 15th FC / JJM</div>
              </div>

              <div>
                <div className="text-[11px] text-[#667085] uppercase font-bold tracking-wider">Citizen Grievances</div>
                <div className="font-bold text-[#DC3545] text-sm mt-0.5">{activeWard.openComplaints} Open Issues</div>
                <div className="text-[#667085] mt-1">Under resolution tracking</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
