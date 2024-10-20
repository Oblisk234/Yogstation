// A collection of pre-set uplinks, for admin spawns.

// Radio-like uplink; not an actual radio because this uplink is most commonly
// used for nuke ops, for whom opening the radio GUI and the uplink GUI
// simultaneously is an annoying distraction.
/obj/item/uplink
	name = "station bounced radio"
	icon = 'icons/obj/radio.dmi'
	icon_state = "radio"
	item_state = "walkietalkie"
	desc = "A basic handheld radio that communicates with local telecommunication networks."
	lefthand_file = 'icons/mob/inhands/misc/devices_lefthand.dmi'
	righthand_file = 'icons/mob/inhands/misc/devices_righthand.dmi'
	dog_fashion = /datum/dog_fashion/back

	flags_1 = CONDUCT_1
	slot_flags = ITEM_SLOT_BELT
	throw_speed = 3
	throw_range = 7
	w_class = WEIGHT_CLASS_SMALL

/obj/item/uplink/Initialize(mapload, owner, tc_amount = 20)
	. = ..()
	AddComponent(/datum/component/uplink, owner, FALSE, TRUE, null, tc_amount)

/obj/item/uplink/debug
	name = "debug uplink"

/obj/item/uplink/debug/Initialize(mapload, owner, tc_amount = 9000)
	. = ..()
	var/datum/component/uplink/hidden_uplink = GetComponent(/datum/component/uplink)
	hidden_uplink.name = "debug uplink"

/obj/item/uplink/nuclear/Initialize(mapload)
	. = ..()
	var/datum/component/uplink/hidden_uplink = GetComponent(/datum/component/uplink)
	hidden_uplink.set_antagonist(ROLE_OPERATIVE)

/obj/item/uplink/nuclear/debug
	name = "debug nuclear uplink"

/obj/item/uplink/nuclear/debug/Initialize(mapload, owner, tc_amount = 9000)
	. = ..()
	var/datum/component/uplink/hidden_uplink = GetComponent(/datum/component/uplink)
	hidden_uplink.set_antagonist(ROLE_OPERATIVE)
	hidden_uplink.name = "debug nuclear uplink"

/obj/item/uplink/nuclear_restricted/Initialize(mapload)
	. = ..()
	var/datum/component/uplink/hidden_uplink = GetComponent(/datum/component/uplink)
	hidden_uplink.allow_restricted = FALSE
	hidden_uplink.set_antagonist(ROLE_OPERATIVE)

/obj/item/uplink/clownop/Initialize(mapload)
	. = ..()
	var/datum/component/uplink/hidden_uplink = GetComponent(/datum/component/uplink)
	hidden_uplink.set_antagonist(ROLE_CLOWNOP)

/obj/item/uplink/old
	name = "dusty radio"
	desc = "A dusty looking radio."

/obj/item/uplink/old/Initialize(mapload, owner, tc_amount = 10)
	. = ..()
	var/datum/component/uplink/hidden_uplink = GetComponent(/datum/component/uplink)
	hidden_uplink.name = "dusty radio"

// Multitool uplink
/obj/item/multitool/uplink/Initialize(mapload, owner, tc_amount = 20)
	. = ..()
	AddComponent(/datum/component/uplink, owner, FALSE, TRUE, null, tc_amount)

// Pen uplink
/obj/item/pen/uplink/Initialize(mapload, owner, tc_amount = 20)
	. = ..()
	AddComponent(/datum/component/uplink, owner, TRUE, FALSE, null, tc_amount)

// NT Uplink
/obj/item/ntuplink
	name = "\improper nanotrasen uplink"
	icon = 'icons/obj/radio.dmi'
	icon_state = "radio"
	item_state = "walkietalkie"
	desc = "A specialized uplink for authorized Nanotrasen use only."
	lefthand_file = 'icons/mob/inhands/misc/devices_lefthand.dmi'
	righthand_file = 'icons/mob/inhands/misc/devices_righthand.dmi'
	dog_fashion = /datum/dog_fashion/back

	flags_1 = CONDUCT_1
	slot_flags = ITEM_SLOT_BELT
	throw_speed = 3
	throw_range = 7
	w_class = WEIGHT_CLASS_SMALL
	var/nt_datum = /datum/component/uplink/nanotrasen //Component for the uplink to use.
	var/wc_start = 20 // Starting warpcrystal amount
	var/datum_owner //i dont know what this does and i'm too afraid to ask

/obj/item/ntuplink/Initialize(mapload, owner)
	. = ..()
	AddComponent(/datum/component/uplink/nanotrasen, owner, FALSE, TRUE, null, wc_start)
	datum_owner = owner
	
/obj/item/ntuplink/proc/finalize() //if the uplink type has been modified somehow, remove it and replace it
	var/datum/component/uplink/nanotrasen/uplink = GetComponent(/datum/component/uplink/nanotrasen)
	if(uplink)
		qdel(uplink)
	AddComponent(nt_datum, datum_owner, FALSE, TRUE, null, wc_start)

/obj/item/ntuplink/official
	name = "centcom official uplink"
	wc_start = 5

/obj/item/ntuplink/amber
	name = "amber ERT uplink"
	wc_start = 10

/obj/item/ntuplink/blue
	name = "blue ERT uplink"
	wc_start = 20

/obj/item/ntuplink/red
	name = "red ERT uplink"
	wc_start = 30

/obj/item/ntuplink/death
	name = "deathsquad uplink"
	wc_start = 350

/obj/item/ntuplink/debug
	name = "debug nanotrasen uplink"
	wc_start = 9000
